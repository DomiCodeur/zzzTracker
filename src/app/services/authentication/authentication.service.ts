import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';

interface AuthResponseData {
  id: string;
  email: string;
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private apiBaseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  register(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(`${this.apiBaseUrl}/register`, {
      email,
      password,
    });
  }

  login(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(`${this.apiBaseUrl}/login`, {
      email,
      password,
    });
  }
}
