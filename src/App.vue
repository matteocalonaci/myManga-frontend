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
  min-height: 100%; 
  font-family: 'Arial', sans-serif;
  background-color: rgb(250, 0, 83); 
  overflow: auto; 
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
}

</style>