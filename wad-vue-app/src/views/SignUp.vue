<template>
  <div class="auth-page">
    <h2>Sign up</h2>
    <form @submit.prevent="onSignup">
      <label>Email</label>
      <input v-model="email" required />

      <label>Password</label>
      <input type="password" v-model="password" required />

      <button type="submit">Sign up</button>
    </form>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script>
export default {
  name: 'SignupView',
  data() {
    return { email: '', password: '', error: '' };
  },
  methods: {
    async onSignup() {
      this.error = '';
      try {
        await this.$store.dispatch('signup', { email: this.email });
        await this.$store.dispatch('fetchPosts');
        this.$router.push({ name: 'Home' });
      } catch (e) {
        this.error = e.message || 'Signup failed';
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
