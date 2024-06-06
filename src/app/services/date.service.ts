import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  private apiBaseUrl = '/api';
  constructor(private http: HttpClient) {}

  saveDate(
    userId: number,
    title: string,
    date: Date,
    token: string
  ): Observable<any> {
    const headers = { Authorization: `Bearer ${token}` };
    const url = `${this.apiBaseUrl}/users/${userId}/dates`;
    console.log('Saving date to URL:', url);
    return this.http.post(url, { title, date }, { headers });
  }
}
