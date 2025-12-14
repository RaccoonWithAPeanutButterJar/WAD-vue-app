<template>
  <div>
    <Header />

    <div class="container">
      <div v-if="loading">Loading...</div>

      <div v-else>
        <h2>Post</h2>

        <div class="post-view">
          <p class="post-content" v-if="!editing">{{ post.postContent }}</p>

          <div v-if="editing" class="edit-area">
            <textarea v-model="editBody" rows="6"></textarea>
            <div class="edit-actions">
              <button @click="saveEdit" class="btn btn-primary">Save</button>
              <button @click="cancelEdit" class="btn btn-ghost">Cancel</button>
            </div>
          </div>

          <div class="meta">
            <span>Author: {{ post.authorName || 'Unknown' }}</span> |
            <span>Date: {{ formatDate(post.postTime) }}</span>
          </div>

          <div class="actions">
            <button @click="startEdit" class="btn">Update</button>
            <button @click="onDelete" class="btn btn-delete">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';

export default {
  name: 'PostView',
  components: { Header },
  data() {
    return {
      post: null,
      loading: true,
      editing: false,
      editBody: '',
      error: ''
    };
  },
  methods: {
    formatDate(d) {
      return d ? new Date(d).toLocaleString() : '';
    },
    async load() {
      this.loading = true;
      try {
        const res = await this.$store.dispatch('fetchPost', this.$route.params.id);
        this.post = res.data;
      } catch (e) {
        // if post not found, go back home
        alert('Failed to load post');
        this.$router.push({ name: 'Home' });
      } finally {
        this.loading = false;
      }
    },
    startEdit() {
      this.editing = true;
      this.editBody = this.post.postContent;
    },
    cancelEdit() {
      this.editing = false;
      this.error = '';
    },
    async saveEdit() {
      if (!this.editBody || !this.editBody.trim()) {
        this.error = 'Content is required';
        return;
      }
      try {
        // update via store (our store expects { id, fields })
        await this.$store.dispatch('updatePost', { id: this.post.postId, fields: { postContent: this.editBody } });

        // refresh posts so Home sees updated data
        await this.$store.dispatch('fetchPosts');

        // navigate back to Home to show updated list
        this.$router.push({ name: 'Home' });
      } catch (e) {
        alert('Failed to update post');
      }
    },
    async onDelete() {
      if (!confirm('Delete this post?')) return;
      try {
        await this.$store.dispatch('deletePost', this.post.postId);
        await this.$store.dispatch('fetchPosts');
        this.$router.push({ name: 'Home' });
      } catch (e) {
        alert('Failed to delete post');
      }
    }
  },
  mounted() {
    this.load();
  }
};
</script>

<style scoped>
.container { max-width:800px; margin:12px auto; padding:12px; }
.post-view { background:#111; color:#fff; padding:16px; border-radius:8px; border:3px solid #ff3333 }
.post-content { white-space:pre-wrap; margin-bottom:12px }
.meta { color:#bbb; margin-bottom:12px; }
.actions { display:flex; gap:8px; margin-top:12px; }
.edit-area textarea { width:100%; padding:8px; box-sizing:border-box; border-radius:6px; background:#0f0f0f; color:#fff; border:1px solid #333 }
.edit-actions { margin-top:8px; display:flex; gap:8px }
.btn { padding:8px 10px; border-radius:6px; cursor:pointer; border:none; background:transparent; color:#fff; }
.btn-delete { background:#ff3333; color:#fff }
.btn-primary { background:#ff3333; color:#fff }
.btn-ghost { background:transparent; color:#fff; border:1px solid rgba(255,255,255,0.12); padding:8px 12px; border-radius:6px; cursor:pointer }
</style>
