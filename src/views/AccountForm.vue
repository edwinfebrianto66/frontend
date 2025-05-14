<template>
    <h2 class="text-xl font-bold mb-6 text-gray-800 border-b pb-3">Account Setting</h2>
    <form class="space-y-4">
      <div>
        <label class="block font-medium">NIK Karyawan</label>
        <input type="text" class="w-full border rounded px-3 py-2" v-model="form.nik" />
      </div>
      <div>
        <label class="block font-medium">Nama</label>
        <input type="text" class="w-full border rounded px-3 py-2" v-model="form.nama" />
      </div>
      <div>
        <label class="block font-medium">Email</label>
        <input type="email" class="w-full border rounded px-3 py-2" v-model="form.email" />
      </div>
      <div>
        <label class="block font-medium">No. Telp</label>
        <input type="text" class="w-full border rounded px-3 py-2" v-model="form.phone" />
      </div>
      <div>
        <label class="block font-medium">Gender</label>
        <select class="w-full border rounded px-3 py-2" v-model="form.gender">
          <option>Laki-laki</option>
          <option>Perempuan</option>
        </select>
      </div>
      <div>
        <label class="block font-medium">Address</label>
        <textarea class="w-full border rounded px-3 py-2" rows="2" v-model="form.address" />
      </div>
      <div class="text-right">
        <button type="button" class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
          Update Profile
        </button>
      </div>
    </form>
  </template>
  
  <script setup>
  import { reactive } from 'vue'
  
  const form = reactive({
    nik: '19000001',
    nama: 'Admin Dua Kelinci',
    email: 'inna@duakelinci.co.id',
    phone: '0895339346702',
    gender: 'Laki-laki',
    address: 'Semampir gg kelurahan no 76'
  })
  </script>
  