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
    <h1 class="text-2xl font-bold mb-4">Daftar Menu</h1>
    <table class="min-w-full border bg-white shadow rounded">
      <thead class="bg-gray-200">
        <tr>
          <th class="px-4 py-2 border">#</th>
          <th class="px-4 py-2 border">Nama Menu</th>
          <th class="px-4 py-2 border">Link</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in menus" :key="index">
          <td class="px-4 py-2 border">{{ index + 1 }}</td>
          <td class="px-4 py-2 border">{{ item.nama }}</td>
          <td class="px-4 py-2 border">{{ item.link }}</td>
        </tr>
      </tbody>
    </table>

    <!-- Tampilkan pesan error -->
    <p v-if="error" class="text-red-600 mt-4">{{ error }}</p>
  </div>
</template>
