<template>
  <div id="app">
    <AppHeader />
    <div class="general-container">
      <router-view />
    </div>
  </div>
</template>

<script>
import { store } from './store'; 
import { watch } from 'vue';
import { useRouter } from 'vue-router';
import AppHeader from './components/AppHeader.vue';

export default {
  name: 'App',
  components: {
    AppHeader,
  },
  setup() {
    const router = useRouter();

    // Resetta la visibilità del carrello quando si cambia pagina
    watch(() => router.currentRoute.value, () => {
      store.isCartVisible = false; // Nascondi il carrello
    });

    return {};
  },
};
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  height: 100%; /* Assicurati che l'altezza sia al 100% */
  font-family: 'Arial', sans-serif;
  background-color: rgb(250, 0, 83); 
}

#app {
  display: flex;
  flex-direction: column; 
  height: 100%; 
}

.general-container {
  flex: 1; 
  margin-top: 8rem; 
  background-color: rgb(250, 0, 83);
  overflow-y: auto; /* Permette lo scrolling verticale */
  -webkit-overflow-scrolling: auto; /* Abilita lo scrolling fluido su iOS */
}

/* Personalizzazione della scrollbar per Webkit (Chrome, Safari) */
.general-container::-webkit-scrollbar {
  width: 12px; /* Larghezza della scrollbar */
}

.general-container::-webkit-scrollbar-thumb {
  background-color: rgb(250, 0, 83);
  border-radius: 10px; /* Raggio degli angoli */
}

.general-container::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1); /* Colore del track */
  border-radius: 10px; /* Raggio degli angoli */
}

/* Personalizzazione della scrollbar per Firefox */
.general-container {
  scrollbar-width: thin; /* Può essere 'auto', 'thin' o 'none' */
  scrollbar-color: rgba(241, 233, 237, 0.858)  rgb(250, 0, 83);/* Colore del thumb e del track */
}
</style>