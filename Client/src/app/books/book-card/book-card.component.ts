import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Book } from 'src/app/_models/book.model';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.css'],
})
export class BookCardComponent implements OnInit {
  @Input() book: Book;
  selectedBook: Book;

  constructor() {}

  ngOnInit() {}

  addToList(book: Book) {
    // console.log('book', book);
  }

  selectBook(book: Book) {
    const modalTitle = document.getElementById('ModalLabel');
    const modalBody = document.getElementById('ModalBody');
    modalTitle.innerHTML = book.title + ' by ' + book.authors[0];
    modalBody.innerHTML = book.description;
  }
}
