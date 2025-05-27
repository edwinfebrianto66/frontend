<template>
  <div class="p-6">
    <EasyDataTable
      :headers="headers"
      :items="processedMenus"
      :rows-per-page="10"
      table-class-name="red-compact-table"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import api from '@/utils/axios'

const menus = ref([])

const headers = [
  { text: '', value: 'index', width: 50 },
  { text: 'Name', value: 'name', sortable: true },
  { text: 'Level', value: 'level', sortable: true },
  { text: 'Urutan', value: 'urutan', sortable: true },
  { text: 'Link / Model Name', value: 'model' },
  { text: 'Icon', value: 'icon' },
  { text: 'Parent', value: 'parent' },
]

const processedMenus = computed(() => {
  return menus.value.map((menu, index) => ({
    ...menu,
    index: index + 1
  }))
})

onMounted(async () => {
  try {
    const token = localStorage.getItem('token')
    const res = await api.get('/menu/datatable')
    menus.value = res.data
  } catch (err) {
    console.error(err)
  }
})
</script>
