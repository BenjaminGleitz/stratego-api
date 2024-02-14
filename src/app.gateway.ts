import { Logger } from "@nestjs/common";
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway()
export class AppGateway{
    private static LOGGER :Logger = new Logger('Gateway');
    private static CHANNEL = "message";

    @WebSocketServer()
    private server : Server;

    handleConnection(socket: Socket) {
        const ip = socket.client.conn.remoteAddress;
        this.server.emit(AppGateway.CHANNEL, `Welcome @${socket.id} on @${ip} !`)
    }

    @SubscribeMessage(AppGateway.CHANNEL)
    handleMessage(@ConnectedSocket() socket: Socket,@MessageBody() message: string){
        AppGateway.LOGGER.log(`Gateway <- ${socket.id} ${message}`);
        socket.broadcast.emit(AppGateway.CHANNEL, `@${socket.id} ${message}`);
        return "ok";
    }
    handleDisconnect(socket: Socket) {
        const ip = socket.client.conn.remoteAddress;
        this.server.emit(AppGateway.CHANNEL, `@${socket.id} --> gone`);
    }
}