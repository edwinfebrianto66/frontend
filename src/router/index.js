import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '../layouts/MainLayout.vue'
import AuthLayout from '../layouts/AuthLayout.vue'
import MenuIndex from '../views/MenuIndex.vue'
import ProfileIndex from '../views/ProfileIndex.vue'
import LoginForm from '../components/LoginForm.vue'
import RegisterForm from '../components/RegisterForm.vue'
import menuRoutes from '../modules/menu/routes'


const routes = [
  {
    path: '/',
    component: MainLayout,
    meta: { requiresAuth: true },
    children: [
      { path: '', name: 'MenuIndex', component: MenuIndex },
      { path: 'profile', name: 'ProfileIndex', component: ProfileIndex },
		...menuRoutes // ⬅️ tambahkan di sini

    ]
  },
  {
    path: '/login',
    component: AuthLayout,
    children: [{ path: '', name: 'LoginForm', component: LoginForm }]
  },
  {
    path: '/register',
    component: AuthLayout,
    children: [{ path: '', name: 'RegisterForm', component: RegisterForm }]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem('token')
  if (to.meta.requiresAuth && !isLoggedIn) {
    next('/login')
  } else {
    next()
  }
})

export default router