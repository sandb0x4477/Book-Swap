import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { Book } from '../_models/book.model';
import { BookService } from '../_services/book.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  books: Book[];

  constructor(private auth: AuthService, private router: Router,
    private alertify: AlertifyService, private bookSrv: BookService) { }

  ngOnInit() {
    this.getRandomBooks();
  }

  loggedIn() {
    return this.auth.loggedIn();
  }

  getRandomBooks() {
    this.bookSrv.getRandomBooks().subscribe((res: Book[]) => {
      this.books = res;
    })
  }

  login() {
    const user = {
      username: 'user1',
      password: 'password'
    }
    this.auth.login(user).subscribe(
      res => {
        this.alertify.success('Login Sucessful');
      },
      err => {
        this.alertify.error(err);
      }, () => {
        this.router.navigate(['/booklatest']);
      });
  }

}
