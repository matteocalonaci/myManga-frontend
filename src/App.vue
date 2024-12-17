<template>
  <div id="app">
    <AppHeader />
    <div class="general-container">
      <router-view />
    </div>
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue';

export default {
  name: 'App',
  components: {
    AppHeader,
  }
};
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  min-height: 100%; /* Imposta l'altezza al 100% */
  font-family: 'Arial', sans-serif;
  background-color: rgb(250, 0, 83); /* Colore di sfondo per il contenuto */
  overflow: auto; /* Aggiungi overflow auto per gestire il contenuto in eccesso */
}

#app {
  display: flex;
  flex-direction: column; /* Disporre gli elementi in colonna */
  height: 100%; /* Imposta l'altezza al 100% */
}

.general-container {
  flex: 1; /* Permette al contenitore di espandersi */
  margin-top: 8rem; /* Spazio per l'intestazione */
  background-color: rgb(250, 0, 83); /* Colore di sfondo per il contenuto */
}

</style>