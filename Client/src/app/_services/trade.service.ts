import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';
import { Trade } from '../_models/trade.model';

@Injectable({
  providedIn: 'root',
})
export class TradeService {
  baseUrl = environment.apiUrl + 'trades/';

  constructor(private http: HttpClient, private auth: AuthService) {}

  // creates header
  private authHeader() {
    return {
      headers: new HttpHeaders({
        authorization: `Bearer ${this.auth.getToken()}`,
      }),
      params: new HttpParams(),
    };
  }

  getRequestedTrades(): Observable<Trade[]> {
    return this.http.get<Trade[]>(this.baseUrl + 'requested', this.authHeader());
  }

  getPendingTrades(): Observable<Trade[]> {
    return this.http.get<Trade[]>(this.baseUrl + 'pending', this.authHeader());
  }

  createTrade(trade: any): Observable<Trade> {
    return this.http.post<any>(this.baseUrl, trade, this.authHeader());
  }

  updateTrade(id: string, trade: any) {
    return this.http.put(this.baseUrl + id, trade, this.authHeader())
  }

  deleteTrade(id: string): Observable<any> {
    return this.http.delete(this.baseUrl + id, this.authHeader());
  }
}
