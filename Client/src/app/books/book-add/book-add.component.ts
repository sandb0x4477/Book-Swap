import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { GoggleSearchService } from 'src/app/_services/goggle-search.service';
import { Book } from 'src/app/_models/book.model';

@Component({
  selector: 'app-book-add',
  templateUrl: './book-add.component.html',
  styleUrls: ['./book-add.component.css'],
})
export class BookAddComponent implements OnInit {
  @ViewChild('form') searchForm: NgForm;

  books: Book[];
  query = '';
  footerMode: number;

  constructor(private goggleSrv: GoggleSearchService) {}

  ngOnInit() {
    if (localStorage.getItem('books')) {
      this.books = JSON.parse(localStorage.getItem('books'));
    }
  }

  onSubmit(form: NgForm) {
    if (form.value.query === '') {
      return;
    }
    this.goggleSrv.queryGoogle(form.value.query).subscribe((res: Array<any>) => {
      // console.log('res', res);
      this.books = this.filterResult(res);
      localStorage.setItem('books', JSON.stringify(this.books));
    });
  }

  filterResult(arr: Array<any>) {
    const tempArr = [];
    arr.forEach((el) => {
      if (
        (el.volumeInfo.hasOwnProperty('title')) &&
        (el.volumeInfo.hasOwnProperty('authors')) &&
        (el.volumeInfo.hasOwnProperty('description')) &&
        (el.volumeInfo.hasOwnProperty('imageLinks')) &&
        (el.volumeInfo.imageLinks.hasOwnProperty('thumbnail'))
        ) {
          tempArr.push({
            googleId: el.id,
            title: el.volumeInfo.title,
            authors: el.volumeInfo.authors,
            description: el.volumeInfo.description,
            imageUrl: el.volumeInfo.imageLinks.thumbnail
          });
        }
    });
    return tempArr;
  }

  bookRemovedMode(bookId: string) {
    this.books = this.books.filter(b => b.googleId !== bookId);
    localStorage.setItem('books', JSON.stringify(this.books));
  }
}
