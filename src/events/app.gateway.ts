import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class AppGateway {
  @WebSocketServer() server: Server;

  handleConnection(client: any, ...args: any[]) {
    // Gérez la logique lorsqu'un client se connecte
    console.log(`Client connecté: ${client.id}`);
  }

  handleDisconnect(client: any) {
    // Gérez la logique lorsqu'un client se déconnecte
    console.log(`Client déconnecté: ${client.id}`);
  }
}
