import { createApp } from 'vue';
import { router } from './router'; 
import './style.css';
import App from './App.vue';

// Crea l'app e usa il router
createApp(App).use(router).mount('#app');
