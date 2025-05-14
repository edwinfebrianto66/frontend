<template>
    <div>
      <h2 class="text-xl font-bold mb-6 text-gray-800 border-b pb-3">Change Picture</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Foto aktif -->
        <div class="text-center">
          <p class="font-semibold text-gray-700 mb-2">Active Picture</p>
          <img :src="currentImage" alt="Current Picture" class="w-32 h-32 object-contain mx-auto border rounded" />
          <button class="mt-2 text-xs border px-2 py-1 rounded bg-gray-100 text-gray-600">DEFAULT PICTURE</button>
        </div>
  
        <!-- Upload -->
        <div>
          <p class="font-semibold text-gray-700 mb-2">Profile Image</p>
          <div
            class="border-2 border-dashed border-gray-300 rounded p-6 text-center text-gray-400 cursor-pointer"
            @drop.prevent="handleDrop"
            @dragover.prevent
          >
            <p>Drag & drop files here …</p>
            <input type="file" accept="image/*" class="hidden" ref="fileInput" @change="handleFileChange" />
          </div>
  
          <div v-if="previewImage" class="mt-4">
            <img :src="previewImage" class="w-32 h-32 object-contain border rounded mb-2" />
            <div class="flex space-x-2">
              <button @click="clearFile" class="px-3 py-1 text-sm border rounded text-gray-600">🗑️</button>
              <button @click="cancelUpload" class="px-3 py-1 text-sm border rounded text-gray-600">Cancel</button>
              <button @click="submitImage" class="px-3 py-1 text-sm bg-red-600 text-white rounded">Update Picture</button>
            </div>
          </div>
  
          <div class="mt-2">
            <label class="block text-sm mt-2 text-gray-600">Select file …</label>
            <input type="file" accept="image/*" @change="handleFileChange" />
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const currentImage = ref('/duakelinci.png') // default
  const previewImage = ref(null)
  const fileInput = ref(null)
  const selectedFile = ref(null)
  
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      selectedFile.value = file
      previewImage.value = URL.createObjectURL(file)
    }
  }
  
  const handleDrop = (e) => {
    const file = e.dataTransfer.files[0]
    if (file) {
      selectedFile.value = file
      previewImage.value = URL.createObjectURL(file)
    }
  }
  
  const clearFile = () => {
    selectedFile.value = null
    previewImage.value = null
  }
  
  const cancelUpload = () => {
    clearFile()
  }
  
  const submitImage = async () => {
    if (!selectedFile.value) return
  
    const formData = new FormData()
    formData.append('file', selectedFile.value)
  
    try {
      // contoh upload ke API
      const response = await fetch('http://localhost:4000/user/upload-picture', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
      })
  
      if (!response.ok) throw new Error('Upload gagal')
  
      const data = await response.json()
      currentImage.value = data.imageUrl // misalnya URL dikembalikan
      clearFile()
      alert('Upload sukses!')
    } catch (error) {
      alert('Gagal upload gambar.')
    }
  }
  </script>
  