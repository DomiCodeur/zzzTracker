import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError, of } from 'rxjs';
import { catchError, map, tap, switchMap } from 'rxjs/operators';
import { DateModel } from '../../../models/date.model';
import { UserService } from 'src/app/services/user.service';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  private apiBaseUrl = '/api';
  private datesSource = new BehaviorSubject<DateModel[]>([]);
  private selectedDateId = new BehaviorSubject<number | null>(null);

  dates$ = this.datesSource.asObservable();
  selectedDate$ = this.selectedDateId
    .asObservable()
    .pipe(
      switchMap((id) =>
        id === null || id === undefined
          ? [undefined]
          : this.dates$.pipe(
              map((dates) => dates.find((date) => date.id === id) ?? undefined)
            )
      )
    );

  constructor(private http: HttpClient, private userService: UserService) {}

  setSelectedDate(dateId: number): void {
    this.selectedDateId.next(dateId);
  }

  fetchDatesFromAPI(): void {
    const user = this.userService.getUser();
    if (!user) {
      console.error('User not found');
      return;
    }

    const headers = this.createHeaders(user.token);
    this.http
      .get<DateModel[]>(`${this.apiBaseUrl}/users/${user.id}/dates`, {
        headers,
      })
      .pipe(
        map((dates) =>
          dates.map(
            (d) => new DateModel(d.id, d.name, new Date(d.date), d.isSelected)
          )
        ),
        catchError((error) => {
          if (error.status === 404) {
            return of([] as DateModel[]);
          } else {
            console.error('Failed to fetch dates:', error);
            return throwError(() => new Error('Failed to fetch dates'));
          }
        })
      )
      .subscribe((dates) => this.datesSource.next(dates));
  }

  private setClosestDate(dates: DateModel[]) {
    if (dates.length === 0) {
      this.selectedDateId.next(null);
      return;
    }

    const closestDate = dates.reduce((prev, curr) => {
      const now = new Date().getTime();
      const prevDiff = Math.abs(prev.date.getTime() - now);
      const currDiff = Math.abs(curr.date.getTime() - now);
      return currDiff < prevDiff ? curr : prev;
    });

    this.setSelectedDate(closestDate.id);
  }

  saveDate(date: Date, name: string): Observable<DateModel> {
    const user = this.userService.getUser();

    if (!user) {
      console.error('User not found');
      return throwError(() => new Error('User not authenticated'));
    }

    const headers = this.createHeaders(user.token);
    const userId = user.id;
    const payload = { userId, date, name };
    return this.http
      .post<DateModel>(`${this.apiBaseUrl}/users/${user.id}/dates`, payload, {
        headers,
      })
      .pipe(
        tap((newDate) =>
          this.datesSource.next([...this.datesSource.value, newDate])
        ),
        catchError((error) => {
          console.error('Error saving date:', error);
          return throwError(() => new Error('Error saving date'));
        })
      );
  }

  deleteDate(dateId: number): Observable<boolean> {
    const user = this.userService.getUser();
    if (!user) {
      console.error('User not found');
      return throwError(() => new Error('User not authenticated'));
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${user.token}`,
    });

    return this.http
      .delete<boolean>(`${this.apiBaseUrl}/users/${user.id}/dates/${dateId}`, {
        headers,
      })
      .pipe(
        catchError((error) => {
          console.error('Error deleting date:', error);
          return throwError(() => new Error('Error deleting date'));
        })
      );
  }

  getDates(): Observable<DateModel[]> {
    return this.dates$.pipe(
      tap((dates) => console.log('Fetching dates:', dates))
    );
  }

  private createHeaders(token: string): HttpHeaders {
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }
}
