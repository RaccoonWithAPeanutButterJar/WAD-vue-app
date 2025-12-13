import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store'; // <- VEENDU, et see rida on olemas

createApp(App)
  .use(store)   // <- VEENDU, et store on .use()'ga registreeritud
  .use(router)
  .mount('#app');
