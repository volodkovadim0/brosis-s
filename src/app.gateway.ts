import {
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

interface BrosisUpdate {
  readonly updateName: string;
  readonly bro: number;
  readonly sis: number;
  readonly name: string;
  readonly date: string;
}

interface BrosisMessage {
  username: string;
  action: string;
}

@WebSocketGateway({ cors: { origin: '*' } })
export class AppGateway implements OnGatewayConnection {
  static broCounter = 0;
  static sisCounter = 0;
  static lastEvent = '';
  static lastActor = '';
  static lastDate = new Date();

  @WebSocketServer()
  readonly socket: Socket;

  sendUpdate(socket = this.socket) {
    socket.emit('brosis', {
      updateName: AppGateway.lastEvent,
      bro: AppGateway.broCounter,
      sis: AppGateway.sisCounter,
      name: AppGateway.lastActor,
      date: AppGateway.lastDate.toISOString(),
    } as BrosisUpdate);
  }


  handleConnection(client: Socket) {
    this.sendUpdate(client);
  }

  @SubscribeMessage('action')
  sendSis(
    @MessageBody() message: BrosisMessage,
  ) {
    if (message.action === 'bro') {
      AppGateway.broCounter++;
    } else {
      AppGateway.sisCounter++;
    }
    AppGateway.lastActor = message.username;
    AppGateway.lastEvent = message.action;
    AppGateway.lastDate = new Date();
    this.sendUpdate();
  }
}
