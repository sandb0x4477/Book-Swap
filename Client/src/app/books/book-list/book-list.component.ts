import { Component, OnInit } from '@angular/core';

import { BookService } from 'src/app/_services/book.service';

import { Book } from 'src/app/_models/book.model';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
})
export class BookListComponent implements OnInit {
  books: Book[];
  isList: true;

  constructor(private bookSrv: BookService) {}

  ngOnInit() {
    this.getAllBooks();
  }

  getAllBooks(): void {
    this.bookSrv.getAllBooks().subscribe(res => {
      this.books = res;
    });
  }

  bookRemovedMode(bookId: string) {
    this.books = this.books.filter(b => b.id !== bookId);
  }
}
