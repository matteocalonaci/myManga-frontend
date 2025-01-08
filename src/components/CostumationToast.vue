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
    display: flex;
    align-items: center; 
    color: white;
    transition: opacity 0.5s ease; 
  }
  
  .manga-image {
    width: 5rem; 
    height: auto; 
    margin-right: 1rem;
  }
  
  .toast-content {
    flex-grow: 1; 
  }
  </style>