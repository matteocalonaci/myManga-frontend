<template>
  <div id="app">
    <AppHeader />
    <div class="general-container" ref="generalContainer">
      <router-view />
    </div>
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

    watch(() => router.currentRoute.value, () => {
    store.isCartVisible = false;
    if (generalContainer.value) {
        generalContainer.value.scrollTop = 0; // Scorri all'inizio del contenitore
    }
});

    return { generalContainer };
  },
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


</style>