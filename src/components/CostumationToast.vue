<template>
    <div class="custom-toast">
      <img :src="image" alt="Manga Cover" class="manga-image" v-if="image" />
      <div class="toast-content">
        <strong>{{ title }}</strong>
        <p>{{ message }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      title: {
        type: String,
        required: true
      },
      message: {
        type: String,
        required: true
      },
      image: {
        type: String,
        required: true // Assicurati che l'immagine sia obbligatoria
      }
    }
  }
  </script>
  
  <style scoped>
  .custom-toast {
    display: flex; /* Usa flexbox per allineare l'immagine e il testo */
    align-items: center; /* Allinea verticalmente al centro */
    color: white;
    transition: opacity 0.5s ease; /* Transizione per l'opacità */
  }
  
  .manga-image {
    width: 5rem; /* Imposta una larghezza fissa per l'immagine */
    height: auto; /* Mantieni le proporzioni */
    margin-right: 10px; /* Spazio tra l'immagine e il testo */
  }
  
  .toast-content {
    flex-grow: 1; /* Permette al contenuto di espandersi */
  }
  </style>