<template>
  <div>
    <ul>
      <li v-for="post in posts" :key="post.id">
        <router-link :to="`/posts/${post.id}`">{{ truncated(post.body) }}</router-link>
        <small> — {{ formatDate(post.date) }}</small>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const posts = computed(() => store.getters.posts || []);

function truncated(s) {
  if (!s) return '';
  return s.length > 60 ? s.slice(0, 57) + '...' : s;
}
function formatDate(d) {
  if (!d) return '';
  return new Date(d).toLocaleString();
}
</script>

<style scoped>
ul { list-style:none; padding:0 }
li { padding:8px 0; border-bottom:1px solid #eee }
</style>