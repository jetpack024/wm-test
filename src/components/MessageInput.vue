<template>
  <div class="message-input">
    <input v-model="messageText" @keyup.enter="sendMessage" placeholder="Type a message" />
    <button @click="sendMessage">Send</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const messageText = ref('')
const emit = defineEmits(['sendMessage'])

const sendMessage = () => {
  if (messageText.value.trim()) {
    const message = {
      text: messageText.value,
      timestamp: new Date().toLocaleTimeString(),
    }
    emit('sendMessage', message)
    messageText.value = ''
  }
}
</script>

<style scoped>
.message-input {
  display: flex;
  padding: 10px;
  border-top: 1px solid #ccc;
}
input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
button {
  padding: 10px;
  margin-left: 10px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}
</style>
