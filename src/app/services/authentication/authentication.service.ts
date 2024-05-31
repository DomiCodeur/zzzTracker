import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface AuthResponseData {
  id: string;
  email: string;
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private apiBaseUrl = '/api';

  constructor(private http: HttpClient) {}

  register(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(`${this.apiBaseUrl}/users`, {
      email,
      password,
      signInMethod: 'email',
    });
  }

  login(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(`${this.apiBaseUrl}/users/login`, {
      email,
      password,
    });
  }
}
