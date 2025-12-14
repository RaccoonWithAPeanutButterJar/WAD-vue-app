<template>
  <div>
    <Header />

    <main class="content">
      <p v-if="allPosts.length === 0" class="no-posts">No posts yet.</p>

      <div class="post-list">
        <div
          v-for="post in allPosts"
          :key="post.postId"
          class="post-wrapper"
          @click="openPost(post.postId)"
        >
          <UserPost :post="post" />
        </div>
      </div>

      <!-- Controls ALWAYS render after posts (below the list) -->
      <div class="controls" v-if="isAuthenticated">
        <button @click="goAdd" class="btn btn-add">Add Post</button>
        <button @click="deleteAllConfirm" class="btn btn-delete-all">Delete All</button>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import UserPost from '@/components/Post.vue';

export default {
  name: 'MainPage',
  components: { Header, Footer, UserPost },
  computed: {
    ...mapGetters(['allPosts', 'isAuthenticated'])
  },
  methods: {
    openPost(id) {
      this.$router.push({ name: 'Post', params: { id } });
    },
    goAdd() {
      this.$router.push({ name: 'AddPost' });
    },
    deleteAllConfirm() {
      if (!confirm('Delete all posts? This cannot be undone.')) return;
      this.$store.dispatch('deleteAllPosts').then(() => {
        this.$store.dispatch('fetchPosts');
      }).catch(() => {
        alert('Failed to delete all posts');
      });
    }
  },
  mounted() {
    if (this.$store && this.$store.dispatch) {
      this.$store.dispatch('fetchPosts').catch(() => {});
    }
  }
};
</script>

<style scoped>
.content {
  padding: 2rem;
  max-width: 960px;
  margin: 0 auto;
}
.post-list { display:block; }
.post-wrapper { cursor: pointer; margin-bottom: 1rem; }
.controls {
  display:flex;
  gap:10px;
  justify-content:center;
  margin-top: 1.25rem;
}
.btn { padding:8px 12px; border-radius:6px; cursor:pointer; border:none }
.btn-add { background:#2d8f2d; color:#fff }
.btn-delete-all { background:#ff3333; color:#fff }
.no-posts { color:#999; text-align:center; margin-top: 2rem; }
</style>
