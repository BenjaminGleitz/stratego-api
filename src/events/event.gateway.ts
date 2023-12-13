import { Logger } from "@nestjs/common";
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway()
export class EventsGateway{
    private static LOGGER :Logger = new Logger('Gateway');
    private static CHANNEL = "message";

    @WebSocketServer()
    private server : Server;

    handdleConnextion(socket: Socket) {
        const ip = socket.client.conn.remoteAddress;
        this.server.emit(EventsGateway.CHANNEL, `Welcome @${socket.id} on @${ip} !`)
    }

    @SubscribeMessage(EventsGateway.CHANNEL)
    handleMessage(@ConnectedSocket() socket: Socket,@MessageBody() message: string){
        EventsGateway.LOGGER.log(`Gateway <- ${socket.id} ${message}`);
        socket.broadcast.emit(EventsGateway.CHANNEL, `@${socket.id} ${message}`);
        return "ok";
    }
    handleDisconnect(socket: Socket) {
        const ip = socket.client.conn.remoteAddress;
        this.server.emit(EventsGateway.CHANNEL, `@${socket.id} --> gone`);
    }
}