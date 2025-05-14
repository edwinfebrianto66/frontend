<template>
  <div class="w-screen h-screen grid grid-cols-1 md:grid-cols-2 bg-gray-100">
    <div class="bg-white px-10 py-10">
      <img src="/duakelinci.png" alt="Logo" class="w-48 mb-12" />

      <form @submit.prevent="submitLogin" class="max-w-md space-y-5">
        <!-- Username -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Username</label>
          <div class="relative">
            <input
              v-model="username"
              type="text"
              placeholder="Enter your username"
              :class="[
                'w-full border px-3 py-2 rounded focus:outline-none focus:ring-2',
                usernameError ? 'border-red-500 ring-red-500 pr-10' : 'focus:ring-red-500'
              ]"
            />
            <span v-if="usernameError" class="absolute right-3 top-2.5 text-red-500">❗</span>
          </div>
          <p v-if="usernameError" class="text-red-600 text-sm mt-1">{{ usernameError }}</p>
        </div>

        <!-- Password -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <div class="relative">
            <input
              v-model="password"
              type="password"
              placeholder="Enter password"
              :class="[
                'w-full border px-3 py-2 rounded focus:outline-none focus:ring-2',
                passwordError ? 'border-red-500 ring-red-500 pr-10' : 'focus:ring-red-500'
              ]"
            />
            <span v-if="passwordError" class="absolute right-3 top-2.5 text-red-500">❗</span>
          </div>
          <p v-if="passwordError" class="text-red-600 text-sm mt-1">{{ passwordError }}</p>
        </div>

        <div class="flex items-center">
          <input v-model="remember" type="checkbox" class="h-4 w-4 text-red-500 border-gray-300 rounded" />
          <label class="ml-2 text-sm text-gray-700">Remember Me</label>
        </div>

        <button
          type="submit"
          class="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded font-semibold"
        >
          Login
        </button>

        <router-link to="/forgot" class="block text-center text-sm text-red-600 hover:underline">
          I forgot my password
        </router-link>
      </form>
    </div>

    <div class="bg-white hidden md:flex flex-col justify-center items-center px-10 text-center">
      <h1 class="text-2xl font-bold text-gray-800 mb-2">IT APPLICATION- PT. Dua Kelinci</h1>
      <p class="text-gray-600">Welcome back, please login your account</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()
const username = ref('')
const password = ref('')
const remember = ref(false)
const usernameError = ref('')
const passwordError = ref('')
const serverError = ref('')

const submitLogin = async () => {
  usernameError.value = ''
  passwordError.value = ''
  serverError.value = ''

  if (!username.value) usernameError.value = 'Username cannot be blank.'
  if (!password.value) passwordError.value = 'Password cannot be blank.'

  if (usernameError.value || passwordError.value) return

  try {
    const res = await axios.post('http://localhost:4000/auth/login', {
      username: username.value,
      password: password.value
    })
    localStorage.setItem('token', res.data.token)
    router.push('/')
  } catch (err) {
    serverError.value = 'Username atau password salah.'
    alert(serverError.value) // tampilkan alert sederhana
  }
}
</script>
