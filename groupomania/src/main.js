import { createApp } from 'vue';
import Vuelidate from 'vuelidate';
import App from './App.vue';
import router from './router';

const app = createApp(App);
// createApp(App).use(router).mount('#app');
app.use(Vuelidate);
app.use(router).mount('#app');
