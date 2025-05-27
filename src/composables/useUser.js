import { ref } from 'vue'

const user = ref(null)

export function useUser() {
  if (!user.value) {
    const stored = localStorage.getItem('user')
    if (stored) {
      user.value = JSON.parse(stored)
    }
  }
  return { user }
}
