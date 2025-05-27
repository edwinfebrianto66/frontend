export default [
  {
    path: '/menu',
    name: 'MenuIndex',
    component: () => import('./pages/MenuIndex.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/form-menu',
    name: 'FormMenu',
    component: () => import('./pages/FormMenu.vue'),
    meta: { requiresAuth: true }
  }
]
