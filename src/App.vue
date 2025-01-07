<template>
  <div id="app">
    <AppHeader />
    <div class="general-container" ref="generalContainer" @scroll="handleScroll">
      <router-view />
    </div>
    <!-- Pulsante Torna Su -->
    <button class="scroll-to-top" v-if="showScrollButton" @click="scrollToTop"><i class="fa-solid fa-arrow-up"></i></button>
  </div>
</template>

<script>
import { store } from './store'; 
import { watch, ref } from 'vue';
import { useRouter } from 'vue-router';
import AppHeader from './components/AppHeader.vue';

export default {
  name: 'App',
  components: {
    AppHeader,
  },
  setup() {
    const router = useRouter();
    const generalContainer = ref(null);
    const showScrollButton = ref(false);

    watch(() => router.currentRoute.value, () => {
      store.isCartVisible = false;
      if (generalContainer.value) {
        generalContainer.value.scrollTop = 0; // Scorri all'inizio del contenitore
      }
    });

    const handleScroll = () => {
      if (generalContainer.value) {
        showScrollButton.value = generalContainer.value.scrollTop > 200; 
      }
    };

    const scrollToTop = () => {
      if (generalContainer.value) {
        generalContainer.value.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    return { generalContainer, showScrollButton, scrollToTop, handleScroll };
  }
};
</script>

<style>
html, body {
    margin: 0;
    padding: 0;
    height: 100%;
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
    overflow-y: auto; 
    -webkit-overflow-scrolling: touch; /* Cambiato in 'touch' per il supporto mobile */
}

/* Personalizzazione della scrollbar per Webkit (Chrome, Safari) */
.general-container::-webkit-scrollbar {
    width: 0.8rem; 
}

.general-container::-webkit-scrollbar-thumb {
    background-color: rgb(176, 0, 59);
    border-radius: 10px; 
}

.general-container::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1); 
    border-radius: 1rem; 
}

.scroll-to-top {
    position: fixed;
    bottom: 5rem;
    right: 2rem;
    background-color: rgb(255, 255, 255);
    color: rgb(250, 0, 83);
    border: none;
    border-radius: 100%;
    padding: 0.5rem 0.9rem;
    cursor: pointer;
    font-size: 1rem;
    transition: opacity 0.3s ease; /* Aggiungi transizione per l'opacità */
}
</style>