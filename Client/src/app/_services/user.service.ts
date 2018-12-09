import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { User } from '../_models/user.model';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = environment.apiUrl + 'users/';

  constructor(private http: HttpClient, private auth: AuthService) {}

  // creates header
  private authHeader(): Object {
    return {
      headers: new HttpHeaders({
        authorization: `Bearer ${this.auth.getToken()}`,
      }),
    };
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl, this.authHeader());
  }
}
