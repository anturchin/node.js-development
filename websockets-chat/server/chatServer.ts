import { WebSocketServer } from 'ws';
import http from 'node:http';


export class ChatServer {

    private readonly ws: WebSocketServer;
    private readonly server: http.Server;
    private readonly port: number = parseInt(process.env.PORT || '') || 8080;

    constructor() {
        this.server = http.createServer(this.createHttpServer.bind(this));
        this.serverRun();
        this.ws = new WebSocketServer({ server: this.server });
        this.onConnection();
    }

    private createHttpServer(
        _: http.IncomingMessage,
        res: http.ServerResponse
    ): void {
        res.writeHead(200);
        res.end(JSON.stringify({ message: 'connection chat server' }));
    }

    private serverRun(): void {
        this.server.listen(this.port, () => console.log('running...'));
    }

    private onConnection(): void {
        this.ws.on('connection', (connection, req) => {
            const ip: string | undefined = req.socket.remoteAddress;
            console.log(`Connected ${ip}`);

            connection.on('message', (message) => {
                console.log('Received: ' + message);
                for (const client of this.ws.clients) {
                    if (client.readyState !== WebSocket.OPEN) continue;
                    if (client === connection) continue;
                    client.send(message, { binary: false });
                }
            });

            connection.on('close', () => {
                console.log(`Disconnected ${ip}`);
            });
        });
    }
}

new ChatServer();