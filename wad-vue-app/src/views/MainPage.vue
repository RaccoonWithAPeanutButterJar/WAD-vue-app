<template>
  <div>
    <Header />
    <main class="content">
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
import { mapGetters } from 'vuex'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import UserPost from '@/components/Post.vue'

export default {
  name: 'MainPage',
  components: { Header, Footer, UserPost },
  computed: {
    ...mapGetters(['allPosts'])
  }
}
</script>

<style scoped>
.content {
  padding: 2rem;
}
</style>
