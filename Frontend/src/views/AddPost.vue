<template>
  <div class="page">
    <Header />
    <div class="container">
      <h2>Add Post</h2>

      <form @submit.prevent="onAdd">
        <label for="content">Post content</label>
        <textarea id="content" v-model="postContent" rows="6" required></textarea>

        <div class="controls">
          <button type="submit" class="btn btn-primary">Add</button>
          <button type="button" @click="cancel" class="btn btn-ghost">Cancel</button>
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
      postContent: '',
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
        // store expects object with postContent etc. Our store.addPost handles payload object.
        await this.$store.dispatch('addPost', { postContent: this.postContent });
        // pÃ¤rast lisamist fetch ja suuna home peale
        await this.$store.dispatch('fetchPosts');
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
.container { max-width:800px; margin:12px auto; padding:12px; }
textarea { width:100%; padding:8px; box-sizing:border-box; background:#0f0f0f; color:#fff; border-radius:6px; border:1px solid #333 }
.controls { margin-top:8px; display:flex; gap:8px }
.btn-primary { background:#ff3333; color:#fff; border:none; padding:8px 12px; border-radius:6px; cursor:pointer }
.btn-ghost { background:transparent; color:#fff; border:1px solid rgba(255,255,255,0.12); padding:8px 12px; border-radius:6px; cursor:pointer }
.error { color:#ff8888; margin-top:8px }
</style>