import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuoteService {
  private apiURL = 'https://quoteslate.vercel.app/api/quotes/random';

  constructor(private http: HttpClient) {}

  getRandomQuote(language: string): Observable<any> {
    return this.http.get(`${this.apiURL}?tags=inspiration`);
  }
}
