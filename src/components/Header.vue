<template>
  <header class="flex items-center px-6 py-3 bg-white border-b z-10">
    <!-- Toggle Button -->
    <button
      class="block text-gray-600 hover:text-gray-900 focus:outline-none mr-4"
      @click="$emit('toggle-sidebar')"
    >
      <i class="fas fa-bars text-xl"></i>
    </button>

    <h1 class="text-xl font-bold text-gray-800">Account</h1>

    <div class="flex items-center space-x-4 ml-auto">
      <!-- User Info -->
      <div class="text-sm text-right hidden sm:block">
        <div class="text-gray-800 font-semibold">{{ user?.name }}</div>
        <div class="text-xs text-gray-500">{{ user?.role || 'Administrator' }}</div>
      </div>

      <!-- Avatar Dropdown -->
      <div class="relative">
        <img
          src="/duakelinci.png"
          class="w-10 h-10 rounded-full cursor-pointer border"
          alt="User"
          @click="toggleDropdown"
        />
        <ul
          v-if="dropdownOpen"
          class="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-50 py-1"
        >
          <li>
            <router-link
              to="/profile"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              @click="closeDropdown"
            >
              My Profile
            </router-link>
          </li>
          <li>
            <button
              @click="logout"
              class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Sign Out
            </button>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const dropdownOpen = ref(false)
const user = ref(null) // ⬅️ Tambahkan ini

onMounted(() => {
  // Ambil data user dari localStorage
  const storedUser = localStorage.getItem('user')
  if (storedUser) {
    user.value = JSON.parse(storedUser)
  }

  window.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  window.removeEventListener('click', handleClickOutside)
})

const toggleDropdown = (e) => {
  dropdownOpen.value = !dropdownOpen.value
  e.stopPropagation()
}

const closeDropdown = () => {
  dropdownOpen.value = false
}

const handleClickOutside = (e) => {
  if (!e.target.closest('.relative')) {
    dropdownOpen.value = false
  }
}

const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user') // sekalian hapus user info
  router.push('/login')
}
</script>
