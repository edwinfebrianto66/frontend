<template>
  <div class="flex h-screen overflow-hidden">
    <Sidebar :class="[collapsed ? 'hidden' : 'block']" />

    <div :class="['flex flex-col flex-1 transition-all duration-300', { 'ml-64': !collapsed }]">
      <Header @toggle-sidebar="toggleSidebar" />

      <!-- wrapper untuk isi + footer -->
      <div class="flex flex-col flex-1 overflow-hidden">
        <!-- konten utama -->
        <main class="flex-1 overflow-y-auto bg-gray-50 p-4">
          <router-view />
        </main>

        <!-- footer tetap di bawah -->
        <AppFooter />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Sidebar from '../components/Sidebar.vue'
import Header from '../components/Header.vue'
import AppFooter from '../components/AppFooter.vue'

const collapsed = ref(false)
const toggleSidebar = () => {
  collapsed.value = !collapsed.value
}
</script>
