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
  import api from '@/utils/axios'
  
  const oldPassword = ref('')
  const newPassword = ref('')
  const confirmPassword = ref('')
  const error = ref('')
  const success = ref('')
  
  const updatePassword = async () => {
    error.value = ''
    success.value = ''
  
    if (!oldPassword.value || !newPassword.value || !confirmPassword.value) {
      error.value = 'Semua field harus diisi.'
      return
    }
  
    if (newPassword.value !== confirmPassword.value) {
      error.value = 'Password baru tidak cocok.'
      return
    }
  
    try {
      await api.post('/user/change-password', {
        old_password: oldPassword.value,
        new_password: newPassword.value
      })
  
      success.value = 'Password berhasil diubah.'
      oldPassword.value = ''
      newPassword.value = ''
      confirmPassword.value = ''
    } catch (err) {
      error.value = err.response?.data?.message || 'Gagal mengubah password.'
    }
  }
  </script>
  