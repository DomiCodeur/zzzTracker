// date.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DateModel } from '../../models/date.model';

interface DateResponseData {
  id: number;
  name: string;
  date: string;
}

@Injectable({
  providedIn: 'root',
})
export class DateService {
  private apiBaseUrl = '/api';

  constructor(private http: HttpClient) {}

  saveDate(dateDetail: DateModel): Observable<DateResponseData> {
    return this.http.post<DateResponseData>(
      `${this.apiBaseUrl}/dates`,
      dateDetail
    );
  }

  fetchDates(): Observable<DateResponseData[]> {
    return this.http.get<DateResponseData[]>(`${this.apiBaseUrl}/dates`);
  }

  deleteDate(id: number): Observable<any> {
    return this.http.delete(`${this.apiBaseUrl}/dates/${id}`);
  }
}
