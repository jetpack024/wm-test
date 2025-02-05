<template>
  <div class="username-input">
    <input v-model="username" @keyup.enter="setUsername" placeholder="Enter your username" />
    <button @click="setUsername">Set Username</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const username = ref('')
const emit = defineEmits(['setUsername'])

const setUsername = () => {
  if (username.value.trim()) {
    emit('setUsername', username.value)
  }
}
</script>

<style scoped>
.username-input {
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
