<template>
  <h2 class="text-xl font-bold mb-6 text-gray-800 border-b pb-3">Account Setting</h2>
  <form class="space-y-4">
    <div>
      <label class="block font-medium">NIK Karyawan</label>
      <input type="text" class="w-full border rounded px-3 py-2" v-model="form.nik" />
    </div>
    <div>
      <label class="block font-medium">Nama</label>
      <input type="text" class="w-full border rounded px-3 py-2" v-model="form.name" />
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
        <option value="L">Laki-laki</option>
        <option value="P">Perempuan</option>
      </select>
    </div>
    <div>
      <label class="block font-medium">Address</label>
      <textarea class="w-full border rounded px-3 py-2" rows="2" v-model="form.address" />
    </div>
    <div class="text-right">
      <button @click.prevent="updateProfile" class="bg-red-600 text-white px-4 py-2 rounded">
        Update Profile
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const form = ref({
  id: null,
  username: '',
  name: '',
  email: '',
  phone: '',
  address: '',
  gender: '',
  nik: '',
  role: '',
  last_login_at: '',
  status_online: '',
  permissions: []
})

onMounted(() => {
  const saved = JSON.parse(localStorage.getItem('user'))
  if (saved) form.value = { ...saved }
})

const updateProfile = async () => {
  try {
    const token = localStorage.getItem('token')
    const res = await axios.put('http://localhost:4000/auth/profile', form.value, {
      headers: { Authorization: `Bearer ${token}` }
    })

    localStorage.setItem('user', JSON.stringify(res.data))
    alert('✅ Profile berhasil diupdate')
  } catch (err) {
    alert('❌ Gagal update profile')
    console.error(err)
  }
}
</script>