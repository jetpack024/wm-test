<template>
  <div class="user-list">
    <h3>Server Status</h3>
    <div
        :class="connectionStatus ? 'server-status-fail' : 'server-status-ok'">
      {{ connectionStatus ? 'Connection Lost' : 'Connection is ok' }}
    </div>
    <h3>Users Log</h3>
    <div v-if="notification" class="notification">{{ notification }}</div>
  </div>
</template>

<script setup>
import {ref, watch, computed} from 'vue'
import {useChatStore} from '../../store/chat.js'

const chatStore = useChatStore()
const connectionStatus = computed(() =>{ return chatStore.connectionStatus === 'disconnected'})
const props = defineProps({
  users: Array,
  notification: String,
})

const users = ref(props.users)
const notification = ref(props.notification)

// Следим за изменениями в списке пользователей
watch(() => props.users, (newUsers) => {
  users.value = newUsers
})

// Следим за изменениями в уведомлениях
watch(() => props.notification, (newNotification) => {
  notification.value = newNotification
})
</script>

<style scoped>
.user-list {
  padding: 10px;
  border-right: 1px solid #ccc;
  width: 300px;
}

.user-list h3 {
  margin-bottom: 10px;
}

.user-list ul {
  list-style-type: none;
  padding: 0;
}

.user-list li {
  padding: 5px;
  border-bottom: 1px solid #ccc;
}

.user-list li.connected {
  color: green;
}

.user-list li:not(.connected) {
  color: red;
}

.notification {
  margin-top: 10px;
  padding: 10px;
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
  border-radius: 5px;
}

.server-status-ok {
  margin-bottom: 200px;
  color: chartreuse;;
}

.server-status-fail {
  margin-bottom: 200px;
  color: red;
}
</style>
