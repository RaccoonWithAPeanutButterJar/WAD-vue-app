// src/store/index.js
import { createStore } from 'vuex';

const STORAGE_KEY_TOKEN = 'wad_token_v1';
const STORAGE_KEY_EMAIL = 'wad_email_v1';

export default createStore({
  state() {
    return {
      token: localStorage.getItem(STORAGE_KEY_TOKEN) || null,
      userEmail: localStorage.getItem(STORAGE_KEY_EMAIL) || null,
      posts: []
    };
  },
  getters: {
  allPosts: state => {
    return [...state.posts].sort(
      (a, b) => new Date(b.postTime) - new Date(a.postTime)
    );
  },
  isAuthenticated: state => !!state.token
},
  mutations: {
  setToken(state, token) {
    state.token = token;
    token
      ? localStorage.setItem(STORAGE_KEY_TOKEN, token)
      : localStorage.removeItem(STORAGE_KEY_TOKEN);
  },

  setUserEmail(state, email) {
    state.userEmail = email;
    email
      ? localStorage.setItem(STORAGE_KEY_EMAIL, email)
      : localStorage.removeItem(STORAGE_KEY_EMAIL);
  },

  setPosts(state, posts) {
    state.posts = posts;
  },

  addPost(state, post) {
    state.posts.unshift(post);
  },

  updatePost(state, updated) {
    const i = state.posts.findIndex(p => p.postId === updated.postId);
    if (i !== -1) state.posts.splice(i, 1, updated);
  },

  deletePost(state, postId) {
    state.posts = state.posts.filter(p => p.postId !== postId);
  },

  clearPosts(state) {
    state.posts = [];
  }
},
  actions: {
    // auth (client-side mock)
    signup({ commit }, { email }) {
      const token = 'local-mock-token';
      commit('setToken', token);
      commit('setUserEmail', email);
      return Promise.resolve({ token });
    },
    login({ commit }, { email }) {
      const token = 'local-mock-token';
      commit('setToken', token);
      commit('setUserEmail', email);
      return Promise.resolve({ token });
    },
    logout({ commit }) {
      commit('setToken', null);
      commit('setUserEmail', null);
      commit('clearPosts');
      return Promise.resolve();
    },

    // posts API (client-only)
    async fetchPosts({ commit }) {
      const res = await fetch('http://localhost:3000/api/posts');
      const posts = await res.json();
      commit('setPosts', posts);
    },
    async addPost({ commit, state }, payload) {
      const res = await fetch('http://localhost:3000/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          authorName: state.userEmail || 'You',
          postContent: payload.postContent || payload,
          postImage: payload.postImage || null
        })
      });

      const newPost = await res.json();
      commit('addPost', newPost);
    },
    async updatePost({ commit }, { id, fields }) {
      const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields)
      });

      const updated = await res.json();
      commit('updatePost', updated);
    },
    async deletePost({ commit }, id) {
      await fetch(`http://localhost:3000/api/posts/${id}`, {
        method: 'DELETE'
      });
      commit('deletePost', id);
    },
    async deleteAllPosts({ commit }) {
      await fetch('http://localhost:3000/api/posts', {
        method: 'DELETE'
      });
      commit('clearPosts');
    }
  }
});
