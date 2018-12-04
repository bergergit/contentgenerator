import { Injectable } from '@angular/core';
import { filter } from 'rxjs/operators';

import { Router, NavigationStart } from '@angular/router';
import Auth0Lock from 'auth0-lock';
import { environment } from '../../environments/environment';

// import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// import { catchError } from 'rxjs/operators';
// import { throwError, Observable } from 'rxjs';

// (window as any).global = window;


export interface User {
  username?: string,
  password?: string,
  roles?: string[],
  id?: string
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  /*

  constructor(private http: HttpClient) { }

  authenticate(user: User): Observable<User> {
    return this.http.post<User>(environment.LOGIN_URL, user)
      .pipe(
        catchError(this.handleError)
      );

  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
        
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
  */

  lock = new Auth0Lock(environment.auth_config.clientID, environment.auth_config.domain, {
    autoclose: true,
    auth: {
      redirectUrl: environment.auth_config.callbackURL,
      responseType: 'token id_token',
      params: {
        scope: 'openid'
      }
    }
  });

  constructor(public router: Router) { }

  public login(): void {
    this.lock.show();
  }

  // Call this method in app.component.ts
  // if using path-based routing
  public handleAuthentication(): void {
    this.lock.on('authenticated', (authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        this.router.navigate(['/']);
      }
    });
    this.lock.on('authorization_error', (err) => {
      this.router.navigate(['/']);
      console.log(err);
      alert(`Error: ${err.error}. Check the console for further details.`);
    });
  }

  private setSession(authResult): void {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // Go back to the home route
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }
}
