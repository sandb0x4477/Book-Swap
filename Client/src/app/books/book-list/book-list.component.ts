import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/_models/book.model';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: Book[];
  constructor() { }

  ngOnInit() {
  }

}
