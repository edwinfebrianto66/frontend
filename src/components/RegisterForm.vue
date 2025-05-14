<template>
  <div class="max-w-md mx-auto mt-20 bg-white p-8 rounded-lg shadow-lg">
    <h2 class="text-2xl font-bold mb-6 text-red-700 text-center">Register</h2>
    <form @submit.prevent="submitRegister" class="space-y-4">
      <input v-model="email" type="email" placeholder="Email"
        class="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600" required />
      <input v-model="password" type="password" placeholder="Password"
        class="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600" required />
      <div v-if="error" class="text-sm text-red-600">{{ error }}</div>
      <button type="submit"
        class="w-full bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded">Register</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()
const name = ref('')
const email = ref('')
const password = ref('')
const error = ref('')

const submitRegister = async () => {
  error.value = ''
  try {
    const res = await axios.post('http://localhost:4000/register', {
      name: name.value,
      email: email.value,
      password: password.value
    })
    localStorage.setItem('token', res.data.token)
    router.push('/')
  } catch (err) {
    error.value = 'Register gagal. Periksa email/password.'
  }
}
</script>