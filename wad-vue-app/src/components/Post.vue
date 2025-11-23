<template>
  <div class="post">
    <header class="postheader">
      <img :src="post.profileImage" class="profilepic" />
      <span class="author-name">{{ post.authorName }}</span>
      <span class="post-time">{{ formattedTime }}</span>
    </header>

    <div class="postbody">
      <p>{{ post.postContent }}</p>
      <img v-if="post.postImage" :src="post.postImage" class="post-image" />
    </div>

    <footer class="postfooter">
      <button @click="incrementLikes" class="like-button">
      👍
      </button>
      
        <p>Likes: {{ post.likes }}</p>
      
    </footer>
  </div>
</template>

<script>
export default {
  name: "UserPost",
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  computed: {
    formattedTime() {
      return new Date(this.post.postTime).toLocaleDateString()
    }
  },

  data() {
    return {};
  },
  methods: {
    incrementLikes() {
      this.$store.commit('INCREMENT_LIKES', this.post.postId)
    }
  }
};
</script>

<style scoped>
.post {
  background-color: #111;
  border: 3px solid #ff3333;
  border-radius: 10px;
  color: white;
  margin-bottom: 1.5rem;
  padding: 1rem;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}
.postheader {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}
.postfooter {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-top: 15px;
  max-width: none;
  text-align: center;

  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding-bottom: 20px;
  padding-top: 10px;
}
.profilepic {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 0.5rem;
}
.author-name {
  flex: 1;
  margin-left: 0.5rem;
  font-weight: bold;
}
.post-time {
  font-size: 0.9rem;
  color: #ccc;
}
.postbody p {
  margin: 0.5rem 0;
}
.post-image {
  max-width: 100%;
  margin-top: 0.5rem;
  border-radius: 8px;
}
.like-button {
  padding: 8px 15px;
  background-color: transparent;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;
  text-align: left;
}
.like-button:hover {
  background-color: #0056b3;
  text-align: right;
}
</style>
