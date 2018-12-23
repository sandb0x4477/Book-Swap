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

  constructor(
    private tradeSrv: TradeService,
    private alertify: AlertifyService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.getRequestedTrades();
    this.getPendingTrades();
  }

  // ===========================================================================
  // ! GETS
  // ===========================================================================
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
    this.router.navigate(['/members', trade.tradeOwner.id]);
  }

  onRemove(trade: Trade) {
    console.log('trade', trade);
    const payload = {
      tradeStatus: 'Created',
      tradeOwnerBookId: null,
    };

    this.tradeSrv.updateTrade(trade.id, payload).subscribe(
      () => {
        this.alertify.message('Trade updated');
      },
      err => {
        this.alertify.error(err);
      },
      () => {
        this.getRequestedTrades();
        this.getPendingTrades();
      },
    );
  }

  onSubmitTrade(trade: Trade) {
    console.log('trade', trade);
    const payload = {
      tradeStatus: 'Pending',
    };

    this.tradeSrv.updateTrade(trade.id, payload).subscribe(
      () => {
        this.alertify.message('Trade submitted');
      },
      err => {
        this.alertify.error(err);
      },
      () => {
        this.getRequestedTrades();
        this.getPendingTrades();
      },
    );
  }

  onAcceptTrade(trade: Trade) {
    console.log('trade', trade);
    const payload = {
      tradeStatus: 'Accepted',
    };

    this.tradeSrv.updateTrade(trade.id, payload).subscribe(
      () => {
        this.alertify.message('Trade accepted');
      },
      err => {
        this.alertify.error(err);
      },
      () => {
        this.getRequestedTrades();
        this.getPendingTrades();
      },
    );
  }

  onShowAddres(id: string) {
    console.log('trade', id);
    this.tradeSrv.showUserAddres(id).subscribe(res => {
      console.log(res);

      const modalTitle = document.getElementById('ModalLabel');
      const modalBody = document.getElementById('ModalBody');

      const text = `Address: ${res.address} <br> City: ${res.city} <br> Email: ${res.email}`

      modalTitle.innerHTML = res.username;
      modalBody.innerHTML = text;

    })
  }

  onCancel(trade: Trade) {
    console.log('trade', trade);
    this.tradeSrv.deleteTrade(trade.id).subscribe(
      () => {
        this.alertify.message('Removed');
      },
      err => {
        this.alertify.error(err);
      },
      () => {
        // this.tradesRequested = this.tradesRequested.filter(t => t.trade.id !== trade.trade.id);
        this.getRequestedTrades();
        this.getPendingTrades();
      },
    );
  }
}
