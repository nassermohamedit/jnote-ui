import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { Token } from '../data/token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUrl: string = 'http://localhost:8080/auth/token';

  authenticationSig = signal<boolean | undefined | null>(undefined);

  constructor(private http: HttpClient) { }

  authenticate(credentials: Credential): Observable<boolean> {
    return this.http.post<Token>(this.authUrl, credentials).pipe(
      map((response) => {
        localStorage.setItem('token', response.token)
        this.authenticationSig.set(true);
        return true;
      }),
      catchError((error: HttpErrorResponse) => {
        console.log('error occurred', error);
        this.authenticationSig.set(false);
        return of(false);
      })
    );
  }
}
