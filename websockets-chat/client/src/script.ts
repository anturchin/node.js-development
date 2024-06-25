class Chat {

    private readonly chatWindow: HTMLElement;
    private readonly chatInput: HTMLInputElement;
    private readonly sendButton: HTMLButtonElement;
    private readonly worker: Worker;

    constructor() {
        this.chatWindow = document.getElementById('chat-window') as HTMLElement;
        this.chatInput = document.getElementById('chat-input') as HTMLInputElement;
        this.sendButton = document.getElementById('send-button') as HTMLButtonElement;
        this.worker = new Worker('./dist/worker.js');
        this.worker.postMessage('ws://localhost:8080'); 
        this.onMessage();
        this.setEventListener();
    }

    private onMessage(): void {
        this.worker.onmessage = (event: MessageEvent) => {
            const message = event.data;
            this.addMessageToChatWindow(message);
            this.showNotification('Новое сообщение', message);
        };
    }

    private setEventListener(): void {

        this.sendButton.addEventListener('click', () => {
            this.sendMessage();
        });

        this.chatInput.addEventListener('keypress', (event: KeyboardEvent) => {
            if (event.key === 'Enter') {
                this.sendMessage();
            }
        });
    }

    private sendMessage(): void {
        const message = this.chatInput.value.trim();
        if (message) {
            this.worker.postMessage({ type: 'send', message: message });
            this.addMessageToChatWindow(`( you ) ${message}`, true);
            this.chatInput.value = '';
        }
    }

    private showNotification(title: string, message: string): void {
        if (Notification.permission === 'granted') {
            new Notification(title, { body: message });
        } else if (Notification.permission !== 'denied') {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    new Notification(title, { body: message });
                }
            });
        }
    }

    private addMessageToChatWindow(message: string, myMessage: boolean = false): void {
        const messageElement = document.createElement('p');
        if (myMessage) {
            messageElement.classList.add('left');
        } else {
            messageElement.classList.add('right');
        }
        messageElement.textContent = message;
        this.chatWindow.appendChild(messageElement);
        this.chatWindow.scrollTop = this.chatWindow.scrollHeight;
    }
}

new Chat();