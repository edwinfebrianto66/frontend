<script setup>
import { ref, onMounted } from 'vue'
import api from '../utils/axios'

const menus = ref([])
const error = ref(null)

onMounted(async () => {
  try {
    const res = await api.get('/menu/tree')
    menus.value = res.data
  } catch (e) {
    error.value = 'Menu gagal dimuat. Anda akan dialihkan ke login jika sesi sudah habis.'
    console.warn('⚠️ Gagal ambil menu:', e.message)
  }
})
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Dashboard</h1>

    <!-- Tampilkan pesan error -->
    <p v-if="error" class="text-red-600 mt-4">{{ error }}</p>
  </div>
</template>
