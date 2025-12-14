<template>
  <div class="post">
    <header class="postheader">
      <img v-if="post.profileImage" :src="post.profileImage" class="profilepic" />
      <span class="author-name">{{ post.authorName }}</span>
      <span class="post-time">{{ formattedTime }}</span>
    </header>

    <div class="postbody">
      <p>{{ post.postContent }}</p>
      <img v-if="post.postImage" :src="post.postImage" class="post-image" alt="post image" />
    </div>
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
      return this.post && this.post.postTime
        ? new Date(this.post.postTime).toLocaleDateString()
        : '';
    }
  },
  methods: {
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
  gap: 12px;
}
.postfooter {
  padding: 12px;
  border-radius: 8px;
  margin-top: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  white-space: pre-wrap;
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
}
.like-button:hover {
  background-color: rgba(0,86,179,0.12);
}
</style>
