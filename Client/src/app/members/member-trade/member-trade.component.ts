import { Component, OnInit } from '@angular/core';
import { TradeService } from 'src/app/_services/trade.service';
import { Trade } from 'src/app/_models/trade.model';

@Component({
  selector: 'app-member-trade',
  templateUrl: './member-trade.component.html',
  styleUrls: ['./member-trade.component.css']
})
export class MemberTradeComponent implements OnInit {
  trades: any[];

  constructor(private tradeSrv: TradeService) { }

  ngOnInit() {
    this.getTradesForUser();
  }

  getTradesForUser() {
    this.tradeSrv.getTradesForUser().subscribe(res => {
      this.trades = res;
      console.log('this.trades', this.trades);
    })
  }
}
