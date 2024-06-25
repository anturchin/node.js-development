class ChatWorker {

    private socket: WebSocket | null;

    constructor() {
        this.socket = null;
    }

    public start(url: string) {
        this.socket = new WebSocket(url);

        this.socket.addEventListener('message', (messageEvent: MessageEvent) => {
            this.handleMessage(messageEvent.data);
        });

        this.socket.addEventListener('error', (error: Event) => {
            if(error instanceof Error){
                console.error(`WebSocket error: ${error.message}`);
            }
        });

        this.socket.addEventListener('close', () => {
            console.log('WebSocket connection closed');
        });
    }

    public sendMessage(message: string) {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(message);
        }
    }

    private handleMessage(message: string) {
        self.postMessage(message);
    }
}

const chatWorker = new ChatWorker();

self.addEventListener('message', (event: MessageEvent) => {
    if (typeof event.data === 'string') {
        chatWorker.start(event.data);
    } else if (event.data.type === 'send') {
        chatWorker.sendMessage(event.data.message);
    }
});