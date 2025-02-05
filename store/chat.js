import { defineStore } from 'pinia';

export const useChatStore = defineStore('chat', {
    state: () => ({
        messages: JSON.parse(localStorage.getItem('messages')) || [],
        connectionStatus: 'connected',
    }),
    actions: {
        addMessage(message) {
            this.messages.push(message);
            localStorage.setItem('messages', JSON.stringify(this.messages));
        },
        setConnectionStatus(status) {
            this.connectionStatus = status;
        },
    },
});
