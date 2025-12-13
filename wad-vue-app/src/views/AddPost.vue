<template>
  <div class="page">
    <Header />
    <div class="container">
      <h2>Add Post</h2>

      <form @submit.prevent="onAdd">
        <label>Author name</label>
        <input v-model="authorName" placeholder="Your name" />

        <label>Profile image URL (optional)</label>
        <input v-model="profileImage" placeholder="https://..." />

        <label>Post text</label>
        <textarea v-model="postContent" rows="6" required></textarea>

        <label>Post image URL (optional)</label>
        <input v-model="postImage" placeholder="https://..." />

        <div class="controls">
          <button type="submit">Add</button>
          <button type="button" @click="cancel">Cancel</button>
        </div>
      </form>

      <p v-if="error" class="error">{{ error }}</p>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';

export default {
  name: 'AddPostView',
  components: { Header },
  data() {
    return {
      authorName: this.$store.state.userEmail || '',
      profileImage: '',
      postContent: '',
      postImage: '',
      error: ''
    };
  },
  methods: {
    async onAdd() {
      this.error = '';
      if (!this.postContent || !this.postContent.trim()) {
        this.error = 'Post content is required';
        return;
      }

      try {
        // teeme objekti vastavalt store'i eeldustele (postId genereerib store)
        const payload = {
          authorName: this.authorName || this.$store.state.userEmail || 'You',
          profileImage: this.profileImage || '',
          postContent: this.postContent,
          postImage: this.postImage || null,
          likes: 0
        };
        await this.$store.dispatch('addPost', payload);
        // navigeeri home peale
        this.$router.push({ name: 'Home' });
      } catch (e) {
        this.error = e.message || 'Failed to add post';
      }
    },
    cancel() {
      this.$router.push({ name: 'Home' });
    }
  }
};
</script>

<style scoped>
.container { max-width:800px; margin:12px auto; padding:12px }
input, textarea { width:100%; padding:8px; margin-top:6px; box-sizing:border-box; }
.controls { margin-top:8px; display:flex; gap:8px }
.error { color:red; margin-top:8px }
button { padding:8px 12px; }
</style>
