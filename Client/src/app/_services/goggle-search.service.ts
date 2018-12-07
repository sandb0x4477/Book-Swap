import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GoggleSearchService {
  searchTerm = '&maxResults=40&printType=books';

  googleUrl = 'https://www.googleapis.com/books/v1/volumes?q=';

  constructor(private http: HttpClient) {}

  queryGoogle(query: string): Observable<any> {
    const url = `${this.googleUrl}${query}${this.searchTerm}`;
    // console.log(url);
    return this.http.get<any>(url).pipe(map(books => books.items || []));
  }
}
