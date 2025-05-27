<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-2xl font-bold text-gray-800">Account</h1>
        <nav class="text-sm text-gray-500">Home / Admin Dua Kelinci / My Profile</nav>
      </div>
      <div class="text-right">
        <div class="font-semibold text-gray-800">{{ user?.name }}</div>
        <div class="text-sm text-gray-500">{{ user?.role }}</div>
      </div>
    </div>

    <!-- GANTI jadi 4:8 -->
    <div class="grid grid-cols-12 gap-6">
      <!-- Sidebar kiri: 4 kolom -->
      <div class="col-span-12 md:col-span-4">
        <div class="bg-white rounded-lg shadow p-4">
          <img src="/duakelinci.png" alt="Logo" class="w-32 mx-auto mb-6" />
          <ul class="space-y-3">
            <li
              :class="tab === 'account' ? activeClass : inactiveClass"
              @click="tab = 'account'"
            >Account</li>
            <li
              :class="tab === 'settings' ? activeClass : inactiveClass"
              @click="tab = 'settings'"
            >Account Settings</li>
            <li
              :class="tab === 'picture' ? activeClass : inactiveClass"
              @click="tab = 'picture'"
            >Change Picture</li>
            <li
              :class="tab === 'password' ? activeClass : inactiveClass"
              @click="tab = 'password'"
            >Change Password</li>
          </ul>
        </div>
      </div>

      <!-- Konten kanan: 8 kolom -->
      <div class="col-span-12 md:col-span-8">
        <div class="bg-white rounded-lg shadow p-8">
          <component :is="currentComponent" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import AccountDisplay from './AccountDisplay.vue'
import AccountForm from './AccountForm.vue'
import ChangePicture from './ChangePicture.vue'
import ChangePassword from './ChangePassword.vue'
import { useUser } from '@/composables/useUser'
const { user } = useUser()

const tab = ref('account')

const activeClass = 'bg-red-600 text-white px-4 py-3 rounded-md font-medium cursor-pointer'
const inactiveClass = 'text-gray-700 px-4 py-2 border-b hover:bg-gray-50 cursor-pointer'

const currentComponent = computed(() => {
  switch (tab.value) {
    case 'settings': return AccountForm
    case 'account': return AccountDisplay
    case 'picture': return ChangePicture
    case 'password': return ChangePassword
    default: return AccountDisplay
  }
})
</script>
