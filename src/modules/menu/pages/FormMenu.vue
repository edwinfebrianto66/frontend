// Scene: Di dalam ruang kerja Vue.js, kita menemukan developer yang sedang berjuang dengan dropdown yang tidak muncul.

const developer = {
    name: "Si Jagoan Vue",
    debug: function() {
        console.log("Hmm, kenapa dropdown parent1 tidak muncul ya? Mari kita selidiki!");
        
        // Memeriksa apakah parent1Options sudah terisi
        if (parent1Options.value.length === 0) {
            console.log("Parent1Options masih kosong. Mungkin kita belum memanggil getParent dengan benar?");
        } else {
            console.log("Parent1Options sudah terisi! Data yang diterima:", parent1Options.value);
        }

        // Memeriksa apakah getParent dipanggil saat form.type berubah
        if (form.value.type) {
            console.log("getParent dipanggil dengan type:", form.value.type);
        } else {
            console.log("Type masih kosong, pastikan kita memilih type terlebih dahulu!");
        }

        // Memeriksa apakah v-model terhubung dengan benar
        if (form.value.parent1) {
            console.log("Parent1 sudah terhubung dengan v-model:", form.value.parent1);
        } else {
            console.log("Parent1 belum terhubung, ayo kita sambungkan!");
        }

        // Memeriksa apakah ada error yang muncul
        if (errors.value.parent1) {
            console.log("Ada error di parent1:", errors.value.parent1);
        } else {
            console.log("Tidak ada error di parent1, seharusnya dropdown muncul!");
        }
    }
};

// Developer memanggil fungsi debug
developer.debug();

// Scene berlanjut dengan developer yang berusaha memperbaiki masalah
console.log("Mari kita periksa template Vue kita...");

// Memeriksa template
const template = `
<template>
  <div class="bg-white shadow-md rounded-lg p-6">
    <div class="mb-4">
      <h4 class="text-lg font-semibold">Form</h4>
    </div>
    <form @submit.prevent="submitForm">
      <div class="mb-4">
        <label for="name" class="block text-gray-700 text-sm font-bold mb-2">Name</label>
        <input v-model="form.name" type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" placeholder="Name" />
        <p v-if="errors.name" class="text-red-500 text-xs italic">{{ errors.name }}</p>
      </div>

      <div class="mb-4">
        <label for="link" class="block text-gray-700 text-sm font-bold mb-2">Link Model</label>
        <input v-model="form.link" type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="link" placeholder="Link Model" />
        <p v-if="errors.link" class="text-red-500 text-xs italic">{{ errors.link }}</p>
      </div>

      <div class="mb-4">
        <label for="icon" class="block text-gray-700 text-sm font-bold mb-2">Icon</label>
        <input v-model="form.icon" type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="icon" placeholder="icon fontello" />
        <p v-if="errors.icon" class="text-red-500 text-xs italic">{{ errors.icon }}</p>
      </div>

      <div class="mb-4">
        <label for="type" class="block text-gray-700 text-sm font-bold mb-2">Type / Position</label>
        <select v-model="form.type" @change="getParent" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="type">
          <option disabled value="">Select Type / Position</option>
          <option v-for="(value, key) in types" :key="key" :value="key">{{ value }}</option>
        </select>
        <p v-if="errors.type" class="text-red-500 text-xs italic">{{ errors.type }}</p>
      </div>

      <div class="mb-4">
        <label for="urutan" class="block text-gray-700 text-sm font-bold mb-2">Urutan</label>
        <input v-model="form.urutan" type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="urutan" placeholder="Urutan" />
        <p v-if="errors.urutan" class="text-red-500 text-xs italic">{{ errors.urutan }}</p>
      </div>

      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2">Parents</label>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <select v-model="form.parent1" @change="changeParent1" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="parent1">
              <option disabled value="">Select Level 1...</option>
              <option v-for="parent in parent1Options" :key="parent.id" :value="parent.id">
                {{ parent.name }}
              </option>
            </select>
            <p v-if="errors.parent1" class="text-red-500 text-xs italic">{{ errors.parent1 }}</p>
          </div>
          <div>
            <select v-model="form.parent2" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="parent2">
              <option disabled value="">Select Level 2...</option>
              <option v-for="parent in parent2Options" :key="parent.id" :value="parent.id">
                {{ parent.name }}
              </option>
            </select>
            <p v-if="errors.parent2" class="text-red-500 text-xs italic">{{ errors.parent2 }}</p>
          </div>
        </div>
      </div>

      <div class="mt-6 flex justify-end">
        <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          {{ isNewRecord ? 'Create' : 'Update' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import api from '@/utils/axios';

const isNewRecord = ref(true);
const form = ref({
  name: '',
  link: '',
  icon: '',
  type: '',
  urutan: '',
  parent1: '',
  parent2: '',
});
const errors = ref({});
const types = {
  1: 'Left',
  2: 'Top',
};
const parent1Options = ref([]);
const parent2Options = ref([]);

// Fungsi untuk mengambil data awal (jika ada)
const fetchInitialData = async () => {
  if (!isNewRecord.value) {
    try {
      const response = await api.get(`/menu/${id}`); // Ganti `/menu/${id}` dengan endpoint yang sesuai
      Object.assign(form.value, response.data);
      await getParent(form.value.type); // Muat kembali parent options berdasarkan type
    } catch (error) {
      console.error('Error fetching initial data:', error);
    }
  }
};

const getParent = async () => {
  console.log('Type value:', form.value.type); // Debugging
  try {
    if (!form.value.type) {
      parent1Options.value = []; // Reset jika type kosong
      return;
    }
    const response = await api.post('/menu/getparent', { key: form.value.type });
    parent1Options.value = response.data;
    console.log('parent1Options:', parent1Options.value); // Debugging
  } catch (error) {
    console.error('Error fetching parent options:', error);
  }
};

const changeParent1 = async () => {
  try {
    const key = form.value.parent1;
    const response = await api.post('/menu/getchild', { key, level: '1' }); // Ganti dengan endpoint yang sesuai
    parent2Options.value = response.data;
    form.value.parent2 = ''; // Reset parent2 saat parent1 berubah
  } catch (error) {
    console.error('Error fetching child options:', error);
  }
};

const submitForm = async () => {
  errors.value = {}; // Reset errors
  try {
    // Validasi sederhana (sesuaikan dengan kebutuhan Anda)
    if (!form.value.name) {
      errors.value.name = 'Name is required';
    }
    if (!form.value.type) {
      errors.value.type = 'Type is required';
    }

    if (Object.keys(errors.value).length > 0) {
      return; // Hentikan jika ada error validasi
    }

    const response = isNewRecord.value
      ? await api.post('/menu', form.value) // Ganti dengan endpoint yang sesuai
      : await api.put(`/menu/${form.value.id}`, form.value); // Ganti dengan endpoint yang sesuai

    console.log('Form submitted successfully:', response.data);
    // Tampilkan pesan sukses atau lakukan redirect
  } catch (error) {
    console.error('Error submitting form:', error);
  }
};

// Watch form.type untuk memanggil getParent saat nilai berubah
watch(form.value, (newForm) => {
  if (newForm.type) {
    getParent();
  } else {
    parent1Options.value = []; // Reset jika type kosong
  }
}, { deep: true });

onMounted(fetchInitialData);
</script>
