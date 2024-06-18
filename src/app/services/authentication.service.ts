import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

interface AuthResponseData {
  id: string;
  email: string;
  token: string;
  userId: number;
}

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  register(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(`${this.apiUrl}/users`, {
      email,
      password,
      signInMethod: 'email',
    });
  }

  login(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(
      `${this.apiUrl}/auth/authenticate`,
      {
        email,
        password,
      }
    );
  }
}
