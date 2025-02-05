import { WebSocketServer } from 'ws';

function generateUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

const wss = new WebSocketServer({ port: 8080 });
const users = new Map();

wss.on('connection', (ws) => {
    const clientId = generateUniqueId();
    ws.clientId = clientId;

    users.set(clientId, { id: clientId, connected: true, username: 'User' + clientId });
    broadcastUserList();
    broadcastNotification(`User ${clientId} connected`);

    ws.on('message', (message) => {
        const messageString = message.toString('utf-8');

        wss.clients.forEach((client) => {
            if (client.clientId !== clientId && client.readyState === 1) {
                client.send(messageString);
            }
        });
    });

    ws.on('close', () => {
        users.set(clientId, { id: clientId, connected: false, username: 'User' + clientId });
        broadcastUserList();
        broadcastNotification(`User ${clientId} disconnected`);
    });

    ws.on('error', (error) => {
        console.error(`WebSocket error for ${clientId}:`, error);
    });
});

function broadcastUserList() {
    const userList = Array.from(users.values());
    const message = JSON.stringify({ type: 'userList', users: userList });
    wss.clients.forEach((client) => {
        if (client.readyState === 1) {
            client.send(message);
        }
    });
}

function broadcastNotification(text) {
    const message = JSON.stringify({ type: 'notification', text });
    wss.clients.forEach((client) => {
        if (client.readyState === 1) {
            client.send(message);
        }
    });
}

console.log('WebSocket server is running on ws://localhost:8080');
