<template>
  <nav class="nav">
    <div class="left">
      <router-link to="/home">Home</router-link>
      <router-link to="/contact">Contact</router-link>
    </div>

    <div class="right">
      <template v-if="isAuthenticated">
        <span class="email">{{ userEmail }}</span>
        <button @click="goAdd">Add</button>
        <button @click="logout">Logout</button>
      </template>
      <template v-else>
        <router-link to="/login">Login</router-link>
        <router-link to="/signup">Signup</router-link>
      </template>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'NavBar',
  computed: {
    ...mapGetters(['isAuthenticated']),
    userEmail() {
      return this.$store.state.userEmail;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
      this.$router.push({ name: 'Login' });
    },
    goAdd() {
      this.$router.push({ name: 'AddPost' });
    }
  }
};
</script>

<style scoped>
.nav {
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding:10px 12px;
  border-bottom:1px solid #ddd;
}
.left a, .right a, .right button {
  margin-right:10px;
  text-decoration:none;
}
.email { margin-right:12px; font-weight:500; }
</style>
