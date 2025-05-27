<template>
    <div class="p-6 bg-white rounded shadow">
      <h2 class="text-xl font-bold mb-6 text-gray-800 border-b pb-3">Change Password</h2>
  
      <div v-if="error" class="text-sm text-red-600 mb-4">{{ error }}</div>
      <div v-if="success" class="text-sm text-green-600 mb-4">{{ success }}</div>
  
      <div class="space-y-4 text-sm">
        <div class="flex items-center">
          <label class="w-1/4 text-gray-700">Old Password</label>
          <input
            v-model="oldPassword"
            type="password"
            placeholder="Old Password"
            class="flex-1 border rounded px-3 py-2"
          />
        </div>
  
        <div class="flex items-center">
          <label class="w-1/4 text-gray-700">New Password</label>
          <input
            v-model="newPassword"
            type="password"
            placeholder="New Password"
            class="flex-1 border rounded px-3 py-2"
          />
        </div>
  
        <div class="flex items-center">
          <label class="w-1/4 text-gray-700">Repeat New Password</label>
          <input
            v-model="confirmPassword"
            type="password"
            placeholder="Repeat New Password"
            class="flex-1 border rounded px-3 py-2"
          />
        </div>
      </div>
  
      <div class="mt-6 text-right">
        <button
          @click="updatePassword"
          class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          Update Password
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import axios from 'axios'
  
  const oldPassword = ref('')
  const newPassword = ref('')
  const confirmPassword = ref('')
  const error = ref('')
  const success = ref('')
  
  const updatePassword = async () => {
  try {
    const token = localStorage.getItem('token')
    const res = await axios.post('http://localhost:4000/auth/reset-password', {
      oldPassword: oldPassword.value,
      newPassword: newPassword.value
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (res.data.success) {
      alert('✅ Password berhasil diupdate')
    } else {
      alert('❌ Gagal update password')
    }
  } catch (err) {
    alert('❌ Gagal update password')
    console.error(err)
  }
}
  </script>