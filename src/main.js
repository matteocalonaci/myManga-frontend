import { createApp } from 'vue';
import { router } from './router'; 
import './style.css';
import App from './App.vue';
import Toast from "vue-toastification"; 
import "vue-toastification/dist/index.css"; 

// Crea l'app e usa il router
const app = createApp(App);

// Usa vue-toastification
app.use(Toast);

app.use(router).mount('#app');