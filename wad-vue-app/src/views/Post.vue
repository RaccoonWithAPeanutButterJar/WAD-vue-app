<template>
  <div>
    <NavBar />
    <div v-if="loading">Loading...</div>
    <div v-else>
      <h2>Post</h2>
      <p>{{ post.body }}</p>
      <small>{{ formatDate(post.date) }}</small>

      <div class="actions">
        <button @click="onEdit">Update</button>
        <button @click="onDelete">Delete</button>
      </div>

      <div v-if="editing">
        <h3>Edit Post</h3>
        <textarea v-model="editBody" rows="5"></textarea>
        <button @click="saveEdit">Save</button>
        <button @click="cancelEdit">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '../components/NavBar.vue';
import { ref, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default {
  name: 'PostView',
  components: { NavBar },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();

    const post = reactive({ id: null, body: '', date: null });
    const loading = ref(true);
    const editing = ref(false);
    const editBody = ref('');

    function formatDate(d) { if (!d) return ''; return new Date(d).toLocaleString(); }

    async function load() {
      loading.value = true;
      try {
        const res = await store.dispatch('fetchPost', route.params.id);
        Object.assign(post, res.data);
      } catch (e) {
        alert('Failed to load post');
        router.push({ name: 'Home' });
      } finally {
        loading.value = false;
      }
    }

    async function onDelete() {
      if (!confirm('Delete this post?')) return;
      try {
        await store.dispatch('deletePost', post.id);
        router.push({ name: 'Home' });
      } catch (e) {
        alert('Failed to delete post');
      }
    }

    function onEdit() { editing.value = true; editBody.value = post.body; }
    function cancelEdit() { editing.value = false; }

    async function saveEdit() {
      try {
        await store.dispatch('updatePost', { id: post.id, body: editBody.value });
        await load();
        editing.value = false;
      } catch (e) {
        alert('Failed to update post');
      }
    }

    // initial load
    load();

    return { post, loading, editing, editBody, formatDate, onEdit, onDelete, cancelEdit, saveEdit };
  }
};
</script>

<style scoped>
.actions { margin-top:12px }
textarea { width:100% }
</style>
