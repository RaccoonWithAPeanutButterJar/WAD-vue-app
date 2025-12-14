import { createStore } from 'vuex';


export default createStore({
  actions: {

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
