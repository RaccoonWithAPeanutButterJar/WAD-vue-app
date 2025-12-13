<template>
  <div class="contact-page">
    <NavBar />
    <div class="container">
      <h2>Contact Us</h2>
      <p>Email: teacher@example.edu</p>
      <p>Office: Room 123</p>
    </div>
  </div>
</template>

<script>
import NavBar from '../components/NavBar.vue';
export default {
  name: 'ContactView',
  components: { NavBar }
};
</script>

<style scoped>
.container { max-width:640px; margin:24px auto }
</style>
