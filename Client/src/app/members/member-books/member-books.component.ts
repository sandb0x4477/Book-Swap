import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { BookService } from 'src/app/_services/book.service';
import { Book, BooksForUser } from 'src/app/_models/book.model';
import { User } from 'src/app/_models/user.model';

@Component({
  selector: 'app-member-books',
  templateUrl: './member-books.component.html',
  styleUrls: ['./member-books.component.css'],
})
export class MemberBooksComponent implements OnInit {
  books: Book[] = [];
  user: User = new User();
  routeId: string;

  constructor(
    private bookSrv: BookService,
    private router: Router,
    private routeParams: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.routeId = this.routeParams.snapshot.params['id'];
    this.getUserBooks(this.routeId);
  }

  getUserBooks(id: string) {
    this.bookSrv.getBooksForUser(id).subscribe((res: BooksForUser) => {
      this.books = res.books;
      this.user = res.user;
    });
  }

  bookTrade(event: string) {
    console.log('event', event);
  }
}
