import { Component, OnInit } from '@angular/core';

import { BookService } from 'src/app/_services/book.service';

import { Book } from 'src/app/_models/book.model';
import { User } from 'src/app/_models/user.model';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
})
export class BookListComponent implements OnInit {
  books: Book[];
  footerMode: number;
  userId: string;

  constructor(private bookSrv: BookService, private auth: AuthService) {}

  ngOnInit() {
    this.userId = JSON.parse(localStorage.getItem('userId'));
    // this.userId = this.auth.decodeTokenId(localStorage.getItem('token')).id;
    this.getAllBooks(this.userId);
  }

  getAllBooks(id: string): void {
    this.bookSrv.getBooksForUser(id).subscribe((res: any) => {
      this.books = res.books;
    });
  }

  bookRemovedMode(bookId: string) {
    this.books = this.books.filter(b => b.id !== bookId);
  }
}
