import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from '../_models/user.model';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  baseUrl = environment.apiUrl + 'auth/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  currentUser: User;

  constructor(private http: HttpClient) { }

  login(model: any) {
    return this.http.post(this.baseUrl + 'login', model).pipe(
      map((response: any) => {
        // console.log('response', response);
        const user = response;
        if (user) {
          localStorage.setItem('token', user.token);
          localStorage.setItem('user', JSON.stringify(user.username));
          localStorage.setItem('userId', JSON.stringify(user.id));
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
          this.currentUser = user.username;
          // console.log('this.decodedToken', this.decodedToken);
        }
      })
    );
  }

  register(user: any) {
    return this.http.post(this.baseUrl + 'register', user);
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  getToken() {
    const token = localStorage.getItem('token');
    return token;
  }

  decodeTokenId(token: string) {
    return this.jwtHelper.decodeToken(token);
  }
}
