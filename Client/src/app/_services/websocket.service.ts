import { Injectable, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable, BehaviorSubject } from 'rxjs';
import { Observer } from 'rxjs';

import { environment } from '../../environments/environment';
import { Socket } from '../_models/socket.model';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService implements OnInit {
  socket: Socket;

  data = new BehaviorSubject<string>('');

  observer2 = this.data.asObservable();

  observer: Observer<string>;
  // private socket: SocketIOClient.Socket = io(environment.backendURL);

  constructor() {
    this.socket = io(environment.backendURL);
    this.socket.on('TRADE_STATUS', (msg: any) => {
      console.log('msgFromServer-ws Service', msg);
      this.data.next(msg);
    });
  }

  ngOnInit() {
  }

  getTradeUpdate(): Observable<string> {
    return this.observer2;
    // return this.createObservable();
  }

  createObservable(): Observable<string> {
    return new Observable<string>(observer => {
      this.observer = observer;
    });
  }
}

// export class WebsocketService {
//   private socket: SocketIOClient.Socket = io(environment.backendURL);

//   constructor() {
//     this.socket.on('TRADE_STATUS', (msg: any) => {
//       console.log('msgFromServer:-- ', msg);
//       // this.connectUserSuccess(user);
//     });
//   }

//   // public tradeUpdate(tradeId: string) {
//   //   // this.storage.store('username', username);
//   //   this.socket.emit('TRADE_UPDATE', tradeId);
//   // }
// }
