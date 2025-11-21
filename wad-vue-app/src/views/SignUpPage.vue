<template>
  <div class="page-container">

    <Header />

    <main class="signup-container">
      <h2>Create an Account</h2>

      <form class="signup-form">
        <label>
          Username:
          <input type="text" v-model="username" required />
        </label>

        <label>
          Password:
          <input type="password" v-model="password" required />
        </label>

        <button @click.prevent="signup">Sign Up</button>
      </form>
    </main>

    <Footer />

  </div>
</template>

<script>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'

export default {
  components: { Header, Footer },
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    signup() {
      alert(`Signed up as: ${this.username}`);
    }
  }
}
</script>

<style scoped>
.page-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.signup-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}

.signup-form {
  display: flex;
  flex-direction: column;
  background: #222;
  padding: 2rem;
  border-radius: 10px;
  border: 2px solid #ff3333;
  width: 300px;
}

.signup-form label {
  color: white;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
}

.signup-form input {
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid #555;
  background: #111;
  color: white;
}

.signup-form button {
  padding: 0.7rem;
  font-weight: bold;
  border: none;
  background: #ff3333;
  color: white;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 1rem;
}

.signup-form button:hover {
  background: #ff5555;
}
</style>
