<template>
  <div class="chat-container">
    <UserList :users="users" :notification="notification"/>
    <div class="chat">
      <UsernameInput v-if="!username" @setUsername="setUsername"/>
      <MessageList v-else :messages="messages" :username="username"/>
      <MessageInput v-if="username" @sendMessage="sendMessage"/>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted, onUnmounted} from 'vue'
import {useChatStore} from '../../store/chat.js'
import MessageList from './MessageList.vue'
import MessageInput from './MessageInput.vue'
import UsernameInput from './UsernameInput.vue'
import UserList from './UserList.vue'

const chatStore = useChatStore()
const messages = ref(chatStore.messages)
const username = ref('')
const users = ref([])
const notification = ref('')

let socket

const setUsername = (name) => {
  username.value = name;
  localStorage.setItem('username', name)
}

const sendMessage = (message) => {
  if (socket && socket.readyState === WebSocket.OPEN) {
    const messageWithUsername = {...message, username: username.value}
    socket.send(JSON.stringify(messageWithUsername))
    chatStore.addMessage(messageWithUsername)
  }
}

const updateUsers = (newUsers) => {
  users.value = newUsers
}

const showNotification = (message) => {
  notification.value = message
  setTimeout(() => {
    notification.value = ''
  }, 3000)
}

onMounted(() => {
  // Здесь происходит прослушка всех событий с сокета

  const savedUsername = localStorage.getItem('username')
  if (savedUsername) {
    username.value = savedUsername
  }

  socket = new WebSocket('ws://localhost:8080')

  socket.onmessage = (event) => {
    try {
      const message = JSON.parse(event.data)
      if (message.type === 'userList') {
        updateUsers(message.users)
      } else if (message.type === 'notification') {
        showNotification(message.text)
      } else {
        chatStore.addMessage(message)
      }
    } catch (error) {
      console.error('Failed to parse message:', error)
    }
  }

  socket.onopen = () => {
    chatStore.setConnectionStatus('connected')
  }

  socket.onclose = () => {
    chatStore.setConnectionStatus('disconnected')
  }

  socket.onerror = (error) => {
    chatStore.setConnectionStatus('disconnected')
  }
})

onUnmounted(() => {
  if (socket) {
    socket.close()
  }
})
</script>

<style scoped>
.chat-container {
  display: flex;
  height: 100vh;
}

.chat {
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 360px;
}

</style>
