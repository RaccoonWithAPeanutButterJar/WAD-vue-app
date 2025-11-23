<template>
  <div class="page-container">

    <Header />

    <main class="signup-container">
      <h2>Create an Account</h2>

      <form class="signup-form">
        <label>
          Email:
          <input type="email" v-model="email" placeholder="email" required />
        </label>

        <label>
          Password:
          <input type="password" v-model="password" placeholder="password" required />
        </label>

        <p v-if="passwordError" class="password-error">{{ passwordError }}</p>

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
      email: "",
      password: "",
      passwordError: ""
    };
  },
  methods: {
    signup() {
      this.passwordError = "";
      const errors = this.getPasswordErrors(this.password);

      if (errors.length) {
        this.passwordError = "the password is not valid - " + errors.join(", ");
        return;
      }
      alert(`Signed up with: ${this.email}`);
    },

    getPasswordErrors(pwd) {
      const errs = [];

      if (!(pwd.length >= 8 && pwd.length < 15)) {
        errs.push("Length must be at least 8 and less than 15 characters");
      }

      if (!/^[A-Z]/.test(pwd)) {
        errs.push("Starts with an uppercase letter");
      }

      if (!/[A-Z]/.test(pwd)) {
        errs.push("Includes at least one uppercase alphabet character");
      }

      const lowerCount = (pwd.match(/[a-z]/g) || []).length;
      if (lowerCount < 2) {
        errs.push("Includes at least two lowercase alphabet characters");
      }

      if (!/\d/.test(pwd)) {
        errs.push("Includes at least one numeric value");
      }

      if (!/_/.test(pwd)) {
        errs.push("Includes the character '_'");
      }

      return [...new Set(errs)];
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

.password-error {
  color: #ffcccc;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.06);
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  border-radius: 6px;
  font-size: 0.95rem;
}
</style>
