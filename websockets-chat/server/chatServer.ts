import { WebSocket, WebSocketServer } from 'ws';
import http from 'node:http';


export class ChatServer {

    private readonly socket: WebSocketServer;
    private readonly server: http.Server;
    private readonly port: number;
    private readonly connections: Set<WebSocket> = new Set();

    constructor() {
        this.port = parseInt(process.env.PORT || '8080');
        this.server = http.createServer(this.createHttpServer.bind(this));
        this.serverRun();
        this.socket = new WebSocketServer({ server: this.server });
        this.onConnection();
    }

    private createHttpServer(
        _: http.IncomingMessage,
        res: http.ServerResponse
    ): void {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'connection chat server' }));
    }

    private serverRun(): void {
        this.server.listen(this.port, () => console.log('running...'));
    }

    private onConnection(): void {
        this.socket.on('connection', (connection, _) => {

            this.connections.add(connection);
            console.log(`New connection. Total connections: ${this.connections.size}`);

            connection.on('message', (message: string) => this.broadcastMessage(connection, message));
            connection.on('close', () => {
                this.connections.delete(connection);
                console.log(`Connection closed. Total connections: ${this.connections.size}`);
            });
            connection.on('error', (error: Error) => {
                console.error(`Connection error: ${error.message}`);
                this.connections.delete(connection);
            });

        });
    }

    private broadcastMessage(sender: WebSocket, message: string): void {
        for (const client of this.connections) {
            if (client.readyState === WebSocket.OPEN && client !== sender) {
                client.send(message, { binary: false }, (err) => {
                    if (err) {
                        console.error(`Failed to send message: ${err.message}`);
                    }
                });
            }
        }
    }
}

new ChatServer();