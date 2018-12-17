import { Component, OnInit } from '@angular/core';
import { TradeService } from 'src/app/_services/trade.service';
import { Trade } from 'src/app/_models/trade.model';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-member-trade',
  templateUrl: './member-trade.component.html',
  styleUrls: ['./member-trade.component.css'],
})
export class MemberTradeComponent implements OnInit {
  tradesRequested: Trade[];
  tradesPending: Trade[];
  trade: Trade;

  constructor(private tradeSrv: TradeService, private alertify: AlertifyService,
    private router: Router
    ) {}

  ngOnInit() {
    this.getRequestedTrades();
    this.getPendingTrades();
  }

  getRequestedTrades() {
    this.tradeSrv.getRequestedTrades().subscribe((res: Trade[]) => {
      this.tradesRequested = res;
      console.log('tradesRequested', this.tradesRequested);
    });
  }

  getPendingTrades() {
    this.tradeSrv.getPendingTrades().subscribe((res: Trade[]) => {
      this.tradesPending = res;
      console.log('tradesPending', this.tradesPending);
    });
  }

  onChoose(trade: Trade) {
    console.log('trade', trade);
    localStorage.setItem('currentTrade', JSON.stringify(trade));
    this.router.navigate([ '/members', trade.tradeOwner.id ]);
  }

  onCancel(trade: Trade) {
    console.log('trade', trade);
    this.tradeSrv.deleteTrade(trade.id).subscribe((res: any) => {
      this.alertify.message('Removed');
    }, err => {
      this.alertify.error(err);
    }, () => {
      // this.tradesRequested = this.tradesRequested.filter(t => t.trade.id !== trade.trade.id);
      this.getRequestedTrades();
      this.getPendingTrades();
    })
  }
}
