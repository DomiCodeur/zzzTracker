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
    date: Date,
    name: string,
    token: string
  ): Observable<any> {
    const headers = { Authorization: `Bearer ${token}` };
    const url = `${this.apiBaseUrl}/users/${userId}/dates`;
    return this.http.post(url, { userId, date, name }, { headers });
  }

  getDatesByUserId(userId: number, token: string): Observable<any[]> {
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<any[]>(`${this.apiBaseUrl}/users/${userId}/dates`, {
      headers,
    });
  }

  updateDate(
    userId: number,
    dateId: number,
    date: Date,
    name: string,
    token: string
  ): Observable<any> {
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.put(
      `${this.apiBaseUrl}/users/${userId}/dates/${dateId}`,
      { date, name },
      { headers }
    );
  }

  deleteDate(userId: number, dateId: number, token: string): Observable<any> {
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.delete(
      `${this.apiBaseUrl}/users/${userId}/dates/${dateId}`,
      { headers }
    );
  }
}
