<template>
  <div class="auth-page">
    <h2>Login</h2>
    <form @submit.prevent="onLogin">
      <label>Email</label>
      <input v-model="email" required />

      <label>Password</label>
      <input type="password" v-model="password" required />

      <button type="submit">Login</button>
    </form>
    <p>Don't have an account? <router-link to="/signup">Sign up</router-link></p>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script>
export default {
  name: 'LoginView',
  data() {
    return {
      email: '',
      password: '',
      error: ''
    };
  },
  methods: {
    async onLogin() {
      this.error = '';
      try {
        // client-side mock: pass email (store ignores password)
        await this.$store.dispatch('login', { email: this.email });
        await this.$store.dispatch('fetchPosts');
        this.$router.push({ name: 'Home' });
      } catch (e) {
        this.error = e.message || 'Login failed';
      }
    }
  }
};
</script>

<style scoped>
.auth-page { max-width:420px; margin:24px auto }
.error { color: red; margin-top:8px }
label { display:block; margin-top:8px }
input { width:100%; padding:6px; margin-top:4px }
button { margin-top:12px; }
</style>
