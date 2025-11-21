<template>
  <div class="post-list">
    <div v-for="post in posts" :key="post.id" class="post">
      <h3>{{ post.title }}</h3>
      <p>{{ post.body }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "PostList",
  data() {
    return {
      posts: [
        { id: 1, title: "Post 1", body: "a" },
        { id: 2, title: "Post 2", body: "b" },
        { id: 3, title: "Post 3", body: "c" },
        { id: 4, title: "Post 4", body: "d" },
        { id: 5, title: "Post 5", body: "e" },
        { id: 6, title: "Post 6", body: "f" },
        { id: 7, title: "Post 7", body: "g" },
        { id: 8, title: "Post 8", body: "h" },
        { id: 9, title: "Post 9", body: "i" },
        { id: 10, title: "Post 10", body: "j" }
      ]
    };
  }
};
</script>

<style scoped>
.post {
  background: #f4f4f4;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 8px;
}
</style>
