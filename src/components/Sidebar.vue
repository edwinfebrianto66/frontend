<template>
  <aside class="w-64 bg-white border-r h-screen fixed z-40 flex flex-col">
    <div class="p-4 border-b">
      <div class="flex items-center gap-2">
        <img src="/duakelinci.png" alt="logo" class="w-8 h-8" />
        <span class="text-xl font-bold text-red-600">DK APPS</span>
      </div>
    </div>

    <div class="p-4 border-b">
      <input
        type="text"
        placeholder="Search ..."
        class="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-red-500"
      />
    </div>

    <nav class="flex-1 p-4 overflow-y-auto">
      <ul class="space-y-1">
        <SidebarItem v-for="item in menuTree" :key="item.id" :item="item" />
      </ul>
    </nav>
  </aside>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../utils/axios'
import SidebarItem from './SidebarItem.vue'

const menuTree = ref([])

onMounted(async () => {
  try {
    const res = await api.get('/menu/tree')
    menuTree.value = res.data
  } catch (err) {
    console.error('Gagal ambil menu:', err.message)
  }
})
</script>
