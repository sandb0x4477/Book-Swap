import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';

@WebSocketGateway()
export class TradeGateway {
  @WebSocketServer() server;

  // @SubscribeMessage('TRADE_UPDATE')
  // async tradeUpdate(client, data: string): Promise<string> {
  //   console.log('dataFromClient: ', data);
  //   return data;
  // }

  emmitMsg(msg: any) {
    console.log('msg emmited:--- ', msg);
    this.server.sockets.emit('TRADE_STATUS', msg);
  }
}
