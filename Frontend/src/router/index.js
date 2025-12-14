import { createRouter, createWebHistory } from 'vue-router';
import store from '../store';

import LoginView from '../views/Login.vue';
import SignUpView from '../views/SignUp.vue';
import ContactView from '../views/Contact.vue';
import MainPage from '../views/MainPage.vue';
import AddPostView from '../views/AddPost.vue';
import PostView from '../views/Post.vue';

const routes = [
  { path: '/', name: 'Root', component: MainPage },

  { path: '/login', name: 'Login', component: LoginView },
  { path: '/signup', name: 'Signup', component: SignUpView },
  { path: '/contact', name: 'Contact', component: ContactView },

  { path: '/home', name: 'Home', component: MainPage, meta: { requiresAuth: true } },
  { path: '/add', name: 'AddPost', component: AddPostView, meta: { requiresAuth: true } },
  { path: '/posts/:id', name: 'Post', component: PostView, meta: { requiresAuth: true } }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const requires = to.meta.requiresAuth;
  const logged = store.getters.isAuthenticated;
  if (requires && !logged) return next({ name: 'Login' });
  if ((to.name === 'Login' || to.name === 'Signup') && logged) return next({ name: 'Home' });
  next();
});

export default router;
