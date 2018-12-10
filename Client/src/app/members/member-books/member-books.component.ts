import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { BookService } from 'src/app/_services/book.service';
import { Book } from 'src/app/_models/book.model';
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
    this.user.id = this.routeParams.snapshot.params['id'];
    this.getUserBooks(this.user.id);
  }

  getUserBooks(id: string) {
    this.bookSrv.getBooksForUser(id).subscribe((res: any) => {
      this.books = res.books;
      this.user.booksCount = res.bookCount;
      this.user.username = res.username;
      console.log('this.user', this.user);
      console.log('this.books', this.books);
    });
  }

  bookTrade(event: string) {
    console.log('event', event);
  }
}
