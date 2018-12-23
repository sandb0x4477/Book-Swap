import { Component, OnInit } from '@angular/core';

import { Pagination } from 'src/app/_models/pagination';
import { BookService } from 'src/app/_services/book.service';
import { BookLatest, Book } from 'src/app/_models/book.model';

@Component({
  selector: 'app-book-latest',
  templateUrl: './book-latest.component.html',
  styleUrls: ['./book-latest.component.css']
})
export class BookLatestComponent implements OnInit {
  books: Book[];
  pagination: Pagination = new Pagination();

  constructor(private bookSrv: BookService) { }

  ngOnInit() {
    this.pagination.currentPage = 1;
    this.pagination.totalItems = 20;
    this.pagination.itemsPerPage = 6;
    this.getLatestBooks();
  }

  getLatestBooks() {
    this.bookSrv.getLatestBooks(this.pagination.currentPage).subscribe((res: BookLatest) => {
      this.books = res.books;
      this.pagination.totalItems = res.bookCount;
      this.pagination.currentPage = Number(res.page);
    });
  }

  pageChanged(event: any) {
    // console.log('event', event);
    this.pagination.currentPage = event.page;
    this.getLatestBooks();
  }

}
