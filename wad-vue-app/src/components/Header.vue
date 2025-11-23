<template>
  <header class="header">
    <nav class="navbar">
      <div class="nav-links">
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/signup">Signup</router-link></li>
      </div>
      <button @click="resetLikes" class="reset-likes-button">Reset Likes</button>
    </nav>
  </header>
</template>

<script>
export default {
  name: "HeaderComponent",
  methods: {
    resetLikes() {
      this.$store.commit('RESET_LIKES')
    }
  }
};
</script>

<style scoped>
.header {
  background: #333;
  padding: 1rem;
}

.navbar{
  display: flex;
  justify-content: space-between;
  align-items: center;

  background-color: #333;
}

.nav-links {
  display: flex;
  gap: 1rem;
  list-style: none;
}

a {
  color: white;
  text-decoration: none;
}

.reset-likes-button {
  background-color: #ff3333;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
}
.reset-likes-button:hover {
  background-color: #ff6666;
}
</style>
