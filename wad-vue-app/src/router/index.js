import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '../views/MainPage.vue'
import SignUpPage from '../views/SignUpPage.vue'

const routes = [
  { path: '/', component: MainPage },
  { path: '/signup', component: SignUpPage }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
