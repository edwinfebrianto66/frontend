import axios from 'axios'
import router from '../router'

const api = axios.create({
  baseURL: 'http://localhost:4003', // sesuaikan jika perlu
  headers: {
    'Content-Type': 'application/json'
  }
})

// Tambahkan token di setiap request
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Tangani token expired / invalid
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      localStorage.removeItem('token')
      router.push('/login')
    }
    return Promise.reject(error)
  }
)

export default api
