<template>
  <footer class="footer">
    <p>© 2025 My Vue App - All rights reserved or something like that</p>
    <router-link to="/contact" class="contact-link">Contact</router-link>
  </footer>
</template>

<script>
export default {
  name: "FooterComponent"
};
</script>

<style scoped>
.footer {
  background: #333;
  color: white;
  text-align: center;
  padding: 1rem;
  margin-top: 2rem;
}

.contact-link {
  display: inline-block;
  margin-top: 8px;
  color: #ffb3b3;
  text-decoration: none;
  padding: 6px 10px;
  border-radius: 6px;
  border: 1px solid rgba(255,179,179,0.15);
}

.contact-link:hover {
  text-decoration: none;
  background: rgba(255,179,179,0.06);
}
</style>
