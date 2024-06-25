document.addEventListener('DOMContentLoaded', () => {
    
    const chatWindow = document.getElementById('chat-window') as HTMLElement;
    const chatInput = document.getElementById('chat-input') as HTMLInputElement;
    const sendButton = document.getElementById('send-button') as HTMLButtonElement;

    const ws = new WebSocket('ws://localhost:8080');

    ws.onmessage = (event) => {
        const message = event.data;
        addMessageToChatWindow(message);
    };

    sendButton?.addEventListener('click', () => {
        sendMessage();
    });

    chatInput?.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });

    function sendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            ws.send(message);
            addMessageToChatWindow(`You: ${message}`);
            chatInput.value = '';
        }
    }

    function addMessageToChatWindow(message: string) {
        const messageElement = document.createElement('p');
        messageElement.textContent = message;
        chatWindow.appendChild(messageElement);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }
});