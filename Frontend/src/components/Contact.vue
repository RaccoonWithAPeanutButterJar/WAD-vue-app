<template>
  <div class="contact-page">
    <Header />

    <main class="container">
      <h1>Contact</h1>

      <div class="contact-card">
        <p><strong>Name:</strong> John Doe</p>
        <p><strong>Phone:</strong> 12345678</p>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: 'ContactView',
  components: { Header, Footer }
};
</script>

<style scoped>
.container {
  max-width: 720px;
  margin: 28px auto;
  padding: 16px;
  color: #eaeaea;
}

h1 {
  color: #fff;
  margin-bottom: 12px;
}

.contact-card {
  background: #141414;
  border: 2px solid #333;
  border-left: 6px solid #ff3333;
  padding: 18px;
  border-radius: 8px;
  color: #dcdcdc;
  font-size: 1.05rem;
}

.contact-card p { margin: 8px 0; }
</style>
