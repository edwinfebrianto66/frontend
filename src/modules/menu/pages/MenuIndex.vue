<template>
  <div class="bg-white">
    <h2 class="text-xl font-bold text-gray-800 m-4 p-4 " >Daftar Menu</h2>
    <div class="flex flex-wrap gap-4"> 
        <div class="w-full pr-6">
          <div class="float-right">
            <router-link to="/form-menu">
              <button class="bg-red-600 hover:bg-red-500 text-white py-1 px-2 rounded">
              Create Menu
              </button>
            </router-link>
          </div>
        </div>
    </div>
    <div class="w-full">
      <MenuTable :menus="menus" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '@/utils/axios'
import MenuTable from '../components/MenuTable.vue'

const menus = ref([])

const fetchMenus = async () => {
  const token = localStorage.getItem('token')
  const res = await api.get('/menu')
  menus.value = res.data
}

onMounted(fetchMenus)
</script>
