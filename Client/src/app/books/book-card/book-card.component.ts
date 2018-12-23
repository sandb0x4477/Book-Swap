import {
  Component,
  OnInit,
  Input,
  ViewChild,
  EventEmitter,
  Output,
} from '@angular/core';

import { BookService } from 'src/app/_services/book.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

import { Book } from 'src/app/_models/book.model';
import { TradeService } from 'src/app/_services/trade.service';
import { Trade } from 'src/app/_models/trade.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.css'],
})
export class BookCardComponent implements OnInit {
  trade: Trade;
  @Input() book: Book;
  @Input() isList: boolean;
  @Input() footerMode: number;

  @Output() bookRemoved = new EventEmitter<string>();
  @Output() requestBookTrade = new EventEmitter<string>();

  constructor(
    private bookSrv: BookService,
    private alertify: AlertifyService,
    private tradeSrv: TradeService,
    private router: Router,
  ) {}

  ngOnInit() {}

  addToList(book: Book) {
    this.bookSrv.addBook(book).subscribe(
      res => {
        this.bookRemoved.emit(book.googleId);
        this.alertify.success('Added to List');
      },
      err => {
        this.alertify.error(err);
      },
    );
  }

  removeFromList(book: Book) {
    this.bookSrv.deleteBook(book.id).subscribe(
      res => {
        this.alertify.message('Removed');
        this.bookRemoved.emit(book.id);
        // this.searchResultsCleaned = this.searchResultsCleaned.filter(i => i !== item);
      },
      err => {
        this.alertify.error(err);
      },
    );
  }

  selectBook(book: Book) {
    const modalTitle = document.getElementById('ModalLabel');
    const modalBody = document.getElementById('ModalBody');
    modalTitle.innerHTML = book.title + ' by ' + book.authors[0];
    modalBody.innerHTML = book.description;
  }

  requestTrade(book: Book) {
    if (localStorage.getItem('currentTrade')) {
      this.trade = JSON.parse(localStorage.getItem('currentTrade'));
      console.log('this.trade', this.trade);
      this.trade.tradeOwnerBook = book;
      this.trade.tradeStatus = 'Ready';
      this.trade.tradeOwnerBookId = book.id;

      const updateQuery = Object.assign({}, {
        id: this.trade.id,
        tradeStatus: 'Choose',
        tradeOwnerBookId: book.id
      });

      console.log('updateQuery', updateQuery);

      this.tradeSrv.updateTrade(this.trade.id, updateQuery).subscribe(
        (res: Trade) => {
          console.log(res);
          this.alertify.success('Trade updated');
        },
        err => {
          this.alertify.error(err);
        },
        () => {
          localStorage.removeItem('currentTrade');
          this.router.navigate(['/trades']);
        },
      );
    } else {
      const trade = {
        tradeStatus: 'Created',
        targetUserId: book.userId,
        targetBookId: book.id,
      };
      console.log('trade', trade);

      this.tradeSrv.createTrade(trade).subscribe(
        res => {
          this.alertify.success('Trade created');
          console.log(res);
        },
        err => {
          this.alertify.error(err);
        },
        () => {
          this.router.navigate(['/trades']);
        },
      );
    }
  }
}
