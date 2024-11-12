<script>
import AppHeader from './components/AppHeader.vue';


export default {
  name: 'App',
  components: {
    AppHeader,

  }
};
</script>

<template>
  <div id="app">

    <body>
      <AppHeader />
      <div class="general-container">
        <router-view />
      </div>
      
  
    </body>
  </div>
</template>

<style>
html, body {
  margin: 0;
  padding: 0;
  height: 100%; /* Imposta l'altezza al 100% */
  font-family: 'Arial', sans-serif;
  background-color: rgb(250, 0, 83); /* Colore di sfondo per il contenuto */

}

#app {
  display: flex;
  flex-direction: column; /* Disporre gli elementi in colonna */
  height: 100%; /* Imposta l'altezza al 100% */

}
.general-container{
  margin-top: 10rem;
}
.router-view {
  flex: 1; 
  padding: 2rem;
  overflow: auto; 
}
</style>

