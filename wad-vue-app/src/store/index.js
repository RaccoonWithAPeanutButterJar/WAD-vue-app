// src/store/index.js
import { createStore } from 'vuex';

const STORAGE_KEY_POSTS = 'wad_posts_v1';
const STORAGE_KEY_TOKEN = 'wad_token_v1';
const STORAGE_KEY_EMAIL = 'wad_email_v1';

function loadPosts() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_POSTS);
    if (!raw) {
      return defaultPosts();
    }
    return JSON.parse(raw);
  } catch (e) {
    console.warn('Failed to parse posts from localStorage', e);
    return defaultPosts();
  }
}
function savePosts(posts) {
  try {
    localStorage.setItem(STORAGE_KEY_POSTS, JSON.stringify(posts));
  } catch (e) {
    console.warn('Failed to save posts to localStorage', e);
  }
}

function defaultPosts() {
  return [
    {
      postId: 1,
      postTime: "2025-10-01T08:30:00Z",
      authorName: "Alice",
      profileImage: "https://www.placecats.com/neo/300/200",
      postContent: "Just finished my first coding project today!",
      postImage: null,
      likes: 0
    },
    {
      postId: 2,
      postTime: "2025-10-01T09:15:00Z",
      authorName: "Bob",
      profileImage: "https://media.tenor.com/1W-HKNvj8UoAAAAe/cat.png",
      postContent: "Good for you Alice!",
      postImage: null,
      likes: 0
    },
    {
      postId: 3,
      postTime: "2025-10-01T10:00:00Z",
      authorName: "Charlie",
      profileImage: "https://stickerrs.com/wp-content/uploads/2024/03/Cat-Meme-Stickers-Featured.png",
      postContent: "What kind of dog is this?",
      postImage: "https://petapixel.com/assets/uploads/2024/03/hedgehog-featured-image.jpg",
      likes: 0
    },
    {
      postId: 4,
      postTime: "2025-10-01T11:45:00Z",
      authorName: "Diana",
      profileImage: "https://media.tenor.com/CNI1fSM1XSoAAAAe/shocked-surprised.png",
      postContent: "Charlie you muppet that is not a dog.",
      postImage: null,
      likes: 0
    },
    {
      postId: 5,
      postTime: "2025-10-01T12:30:00Z",
      authorName: "Ethan",
      profileImage: "https://i.pinimg.com/736x/b2/60/94/b26094970505bcd59c2e5fe8b6f41cf0.jpg",
      postContent: "When was the deadline for the next ItDS homework, anybody know?",
      postImage: null,
      likes: 0
    },
    {
      postId: 6,
      postTime: "2025-10-01T13:15:00Z",
      authorName: "Fiona",
      profileImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnim2syXRUAOjKSHPaQ9RCabQQexcOU8qyJA&s",
      postContent: "It was like 5 days ago",
      postImage: null,
      likes: 0
    },
    {
      postId: 7,
      postTime: "2025-10-01T12:30:00Z",
      authorName: "Ethan",
      profileImage: "https://i.pinimg.com/736x/b2/60/94/b26094970505bcd59c2e5fe8b6f41cf0.jpg",
      postContent: "...Im so cooked",
      postImage: null,
      likes: 0
    },
    {
      postId: 8,
      postTime: "2025-10-01T14:45:00Z",
      authorName: "Hannah",
      profileImage: "https://i.ytimg.com/vi/qPTd10946jo/maxresdefault.jpg",
      postContent: "Anyone got a pen to borrow, I still need one.",
      postImage: null,
      likes: 0
    },
    {
      postId: 9,
      postTime: "2025-10-01T15:30:00Z",
      authorName: "Ian",
      profileImage: "https://i.ytimg.com/vi/eXwZMAz9Vh8/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAVeD81lYf_ygdk1dICZMM1AtEY0w",
      postContent: "Yes, I do but I won't give it to you",
      postImage: null,
      likes: 0
    },
    {
      postId: 10,
      postTime: "2025-10-01T14:45:00Z",
      authorName: "Hannah",
      profileImage: "https://i.ytimg.com/vi/qPTd10946jo/maxresdefault.jpg",
      postContent: "I swear to god im never gonna get a pen, am I?",
      postImage: null,
      likes: 0
    }
  ];
}

export default createStore({
  state() {
    return {
      token: localStorage.getItem(STORAGE_KEY_TOKEN) || null,
      userEmail: localStorage.getItem(STORAGE_KEY_EMAIL) || null,
      posts: loadPosts()
    };
  },
  getters: {
    // component MainPage uses 'allPosts'
    allPosts: state => {
      // return posts sorted by postTime desc
      return [...state.posts].sort((a, b) => new Date(b.postTime) - new Date(a.postTime));
    },
    isAuthenticated: state => !!state.token
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      if (token) localStorage.setItem(STORAGE_KEY_TOKEN, token);
      else localStorage.removeItem(STORAGE_KEY_TOKEN);
    },
    setUserEmail(state, email) {
      state.userEmail = email;
      if (email) localStorage.setItem(STORAGE_KEY_EMAIL, email);
      else localStorage.removeItem(STORAGE_KEY_EMAIL);
    },
    // posts persistence mutations
    setPosts(state, posts) {
      state.posts = posts;
      savePosts(state.posts);
    },
    addPost(state, post) {
      state.posts.unshift(post);
      savePosts(state.posts);
    },
    updatePost(state, updated) {
      const i = state.posts.findIndex(p => p.postId === updated.postId);
      if (i !== -1) state.posts.splice(i, 1, updated);
      savePosts(state.posts);
    },
    deletePost(state, postId) {
      state.posts = state.posts.filter(p => p.postId !== postId);
      savePosts(state.posts);
    },
    clearPosts(state) {
      state.posts = [];
      savePosts(state.posts);
    },

    // likes
    INCREMENT_LIKES(state, postId) {
      const post = state.posts.find(p => p.postId === postId);
      if (post) post.likes = (post.likes || 0) + 1;
      savePosts(state.posts);
    },
    RESET_LIKES(state) {
      state.posts.forEach(p => { p.likes = 0; });
      savePosts(state.posts);
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
    fetchPosts({ commit, state }) {
      commit('setPosts', state.posts);
      return Promise.resolve({ data: state.posts });
    },
    fetchPost({ state }, id) {
      const post = state.posts.find(p => String(p.postId) === String(id));
      if (!post) return Promise.reject(new Error('Post not found'));
      return Promise.resolve({ data: post });
    },
    addPost({ commit, state }, payload) {
      // payload can be a string (postContent) or object with fields
      const now = new Date().toISOString();
      let newPost;
      if (typeof payload === 'string') {
        newPost = {
          postId: Date.now(),
          postTime: now,
          authorName: state.userEmail || 'You',
          profileImage: '',
          postContent: payload,
          postImage: null,
          likes: 0
        };
      } else {
        newPost = {
          postId: Date.now(),
          postTime: now,
          authorName: payload.authorName || state.userEmail || 'You',
          profileImage: payload.profileImage || '',
          postContent: payload.postContent || '',
          postImage: payload.postImage || null,
          likes: payload.likes || 0
        };
      }
      commit('addPost', newPost);
      return Promise.resolve({ data: newPost });
    },
    updatePost({ commit, state }, { id, fields }) {
      const existing = state.posts.find(p => String(p.postId) === String(id));
      if (!existing) return Promise.reject(new Error('Post not found'));
      const updated = { ...existing, ...fields, postTime: new Date().toISOString() };
      commit('updatePost', updated);
      return Promise.resolve({ data: updated });
    },
    deletePost({ commit }, id) {
      commit('deletePost', Number(id));
      return Promise.resolve();
    },
    deleteAllPosts({ commit }) {
      commit('clearPosts');
      return Promise.resolve();
    }
  }
});
