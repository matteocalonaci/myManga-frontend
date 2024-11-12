<template>
  <div class="loading-screen">
    <div class="loading-content">
      <img src="../assets/img/404_gif.gif" alt="Logo" class="loading-logo" />
      <p>Loading</p>
      <div class="loading-dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .loading-screen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: #fff; /* or any other background color you prefer */
    z-index: 1000; /* make sure it's on top of everything */
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .loading-content {
    text-align: center;
  }
  
  .loading-logo {
    width: 15rem; /* impostare la larghezza dell'immagine */
    height: 12rem; /* impostare l'altezza dell'immagine */
    animation: logo-animation 2s infinite; /* aggiungere l'animazione */
    margin-bottom: 3rem;
  }
  
  .loading-dots {
    display: flex;
    justify-content: center;
    margin-top: 10px;
  }
  
  .loading-dots span {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #bb2d3b; /* or any other color you prefer */
    margin: 0 5px;
    animation: loading-dot 1.5s infinite;
  }
  
  .loading-dots span:nth-child(1) {
    animation-delay: 0s;
  }
  
  .loading-dots span:nth-child(2) {
    animation-delay: 0.5s;
  }
  
  .loading-dots span:nth-child(3) {
    animation-delay: 1s;
  }
  
  @keyframes logo-animation {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }
  
  @keyframes loading-dot {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
    100% {
      transform: translateY(0);
    }
  }
</style>