<template>
  <div class="message-list" ref="messageList">
    <div
        v-for="(message, index) in messages"
        :key="index"
        :class="['message', message.username === username ? 'sent' : 'received']"
        :ref="(el) => { if (index === messages.length - 1) lastMessage = el }"
    >
      <strong v-if="message.username !== username" class="username">{{ message.username }}</strong>
      <div class="message-content">
        <p class="message-text">{{ message.text }}</p>
        <small class="message-timestamp">{{ message.timestamp }}</small>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, watch, nextTick, onMounted} from 'vue'

const props = defineProps({
  messages: Array,
  username: String,
})

const messageList = ref(null)
const lastMessage = ref(null)
onMounted(() => { lastMessage.value.scrollIntoView({ behavior: 'smooth' }) })
// Следим за изменениями в списке сообщений и скроллим вниз при добавлении новых сообщений
watch(() => props.messages, () => {
  nextTick(() => {
    if (lastMessage.value) {
      lastMessage.value.scrollIntoView({ behavior: 'smooth' })
    }
  })
}, { deep: true })
</script>

<style scoped>
.message-list {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
  display: flex;
  flex-direction: column;
  width: 360px;
}

.message {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 10px;
  max-width: 70%;
  word-wrap: break-word;
}

.message.sent {
  align-items: flex-end;
  align-self: flex-end;
  background-color: #d1e7dd;
  color: #0f5132;
}

.message.received {
  align-items: flex-start;
  background-color: #f8d7da;
  color: #842029;
}

.message-content {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.message-text {
  margin: 0;
  border-radius: 10px;
  background-color: inherit;
  color: inherit;
  word-wrap: break-word;
}

.message-timestamp {
  align-self: flex-end;
  margin-top: 5px;
  font-size: 12px;
  color: #6c757d;
}

.username {
  margin-bottom: 5px;
  font-weight: bold;
}
</style>
