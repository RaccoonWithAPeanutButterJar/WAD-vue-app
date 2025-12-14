<template>
  <header class="header">
    <nav class="navbar">
      <div class="nav-links">
        <li><router-link to="/home">Home</router-link></li>
      </div>

      <div class="auth-links">
        <template v-if="isAuthenticated">
          <span class="user-email">{{ userEmail }}</span>
          <button @click="logout" class="logout-button">Logout</button>
        </template>
        <template v-else>
          <router-link to="/login">Login</router-link>
          <router-link to="/signup">Signup</router-link>
        </template>
      </div>

      <button @click="resetLikes" class="reset-likes-button">Reset Likes</button>
    </nav>
  </header>
</template>

<script>
export default {
  name: "HeaderComponent",
  computed: {
    isAuthenticated() {
      return !!(this.$store && this.$store.state && this.$store.state.token);
    },
    userEmail() {
      return (this.$store && this.$store.state && this.$store.state.userEmail) || '';
    }
  },
  methods: {
    resetLikes() {
      this.$store.commit('RESET_LIKES')
    },
    logout() {
      this.$store.dispatch('logout');
      this.$router.push({ name: 'Login' });
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
  gap: 1rem;
}
.nav-links { display:flex; gap:1rem; list-style:none; }
.auth-links { display:flex; gap:0.75rem; align-items:center; }
a { color: white; text-decoration: none; }
.user-email { color: #fff; margin-right:8px; font-weight:500; }
.reset-likes-button, .logout-button {
  background-color: #ff3333;
  color: white;
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 5px;
  cursor: pointer;
}
.reset-likes-button:hover, .logout-button:hover { background-color: #ff6666; }
</style>
