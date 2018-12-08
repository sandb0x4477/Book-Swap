import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Book } from '../_models/book.model';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  baseUrl = environment.apiUrl + 'books/';

  constructor(private http: HttpClient, private auth: AuthService) {}

  // creates header
  private authHeader(): Object {
    return {
      headers: new HttpHeaders({
        authorization: `Bearer ${this.auth.getToken()}`,
      }),
    };
  }

  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.baseUrl, this.authHeader());
  }

  addBook(book: Book): Observable<Book> {
    return this.http.post<any>(this.baseUrl, book, this.authHeader());
  }

  deleteBook(id: string): Observable<any> {
    return this.http.delete(this.baseUrl + id);
  }
}
