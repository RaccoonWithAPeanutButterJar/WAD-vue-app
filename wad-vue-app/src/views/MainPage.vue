<template>
  <div>
    <Header />
    <main class="content">
      <p v-if="allPosts.length === 0">No posts yet.</p>

      <UserPost
        v-for="post in allPosts"
        :key="post.postId"
        :post="post"
      />
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import UserPost from '@/components/Post.vue'

export default {
  name: 'MainPage',
  components: { Header, Footer, UserPost },
  computed: {
    allPosts() {
      try {
        return (this.$store && this.$store.getters && this.$store.getters.allPosts) || [];
      } catch (e) {
        return [];
      }
    }
  },
  mounted() {
    if (this.$store && this.$store.dispatch) {
      this.$store.dispatch('fetchPosts').catch(() => {});
    }
  }
}
</script>

<style scoped>
.content {
  padding: 2rem;
}
</style>
