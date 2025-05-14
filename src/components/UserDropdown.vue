<template>
    <div class="relative" @click.outside="open = false">
      <!-- Avatar -->
      <button @click="toggleDropdown" class="focus:outline-none">
        <img src="/duakelinci.png" alt="Avatar" class="w-10 h-10 rounded-full shadow" />
      </button>
  
      <!-- Dropdown -->
      <div
        v-if="open"
        class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 py-2 text-sm border"
      >
        <div class="px-4 py-2 text-gray-600 border-b">👤 My Profile</div>
        <button
          @click="logout"
          class="w-full text-left px-4 py-2 text-gray-700 hover:bg-red-100 hover:text-red-700"
        >
          🔓 Sign Out
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onBeforeUnmount } from 'vue'
  import { useRouter } from 'vue-router'
  
  const open = ref(false)
  const router = useRouter()
  
  const toggleDropdown = () => {
    open.value = !open.value
  }
  
  // close on outside click
  const clickHandler = (e) => {
    if (!e.target.closest('.relative')) open.value = false
  }
  onMounted(() => window.addEventListener('click', clickHandler))
  onBeforeUnmount(() => window.removeEventListener('click', clickHandler))
  
  const logout = () => {
    localStorage.removeItem('token')
    router.push('/login')
  }
  </script>
  