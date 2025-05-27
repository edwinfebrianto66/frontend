<template>
  <div>
    <h2 class="text-xl font-bold mb-4 border-b pb-2 text-gray-800">Account</h2>
    <div class="space-y-4 text-sm">
      <div class="flex">
        <div class="w-32 font-semibold text-gray-700">Name</div>
        <div>: {{ user?.name }}</div>
      </div>
      <div class="flex">
        <div class="w-32 font-semibold text-gray-700">NIK</div>
        <div>: {{ user?.nik }}</div>
      </div>
      <div class="flex">
        <div class="w-32 font-semibold text-gray-700">Email</div>
        <div>: {{ user?.email }}</div>
      </div>
      <div class="flex">
        <div class="w-32 font-semibold text-gray-700">Phone</div>
        <div>: {{ user?.phone }}</div>
      </div>
      <div class="flex">
        <div class="w-32 font-semibold text-gray-700">Address</div>
        <div>: {{ user?.address }}</div>
      </div>
      <div class="flex">
        <div class="w-32 font-semibold text-gray-700">Gender</div>
        <div>: {{ user?.gender }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const user = ref({})

onMounted(() => {
  const savedUser = localStorage.getItem('user')
  if (savedUser) {
    user.value = JSON.parse(savedUser)
  }
})
</script>
