<template>
  <nav class="navbar navbar-expand-sm">
    <div class="ship text-center bg-white">
      <p style="color: rgb(198, 23, 81);"><b>SPEDIZIONE GRATUITA DA €39</b></p>
    </div>
    <div class="container-fluid mt-3">
      <img class="logo" src="../assets/img/kana_logo.jpeg" alt="">

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation" @click="toggleMenu">
        <i class="fa-solid fa-bars"></i>
      </button>

      <div class="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <div class="menu-mobile d-flex justify-content-between">
            <div>
              <router-link to="/home" @click="navigateTo('home')">
                <i class="fa-solid fa-cart-shopping"></i> Home
              </router-link>

              <router-link to="/manga" @click="navigateTo('manga')">
                <i class="fa-solid fa-book-open"></i> Manga
              </router-link>

              <router-link to="/wish-list" @click="navigateTo('wish-list')">
                <i class="fa-regular fa-heart"></i>
                Lista desideri (<span class="wishlist-count">{{ wishList.length }}</span>)
              </router-link>

              <span @click="store.openCart" class="open-card"> <!-- Chiama il metodo openCart dallo store -->
                <i class="fa-solid fa-cart-shopping"></i> 
                Carrello (<span class="cart-count">{{ cart.length }}</span>)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
  <LoadingScreen v-if="loading" /> 
</template>

<script>
import LoadingScreen from './LoadingScreen.vue';
import { store } from '../store';
import { useRouter } from 'vue-router'; 
import { loading } from '../router'; 
import { computed } from 'vue';

export default {
  name: 'AppHeader',
  components: { LoadingScreen },
  setup() {
    const router = useRouter();

    const wishList = computed(() => store.wishList);
    const cart = computed(() => store.cart);

    const navigateTo = (route) => {
      // Chiudi il menu
      const navbarCollapse = document.getElementById('navbarNavAltMarkup');
      if (navbarCollapse) {
        navbarCollapse.classList.remove('show');
      }
      // Naviga alla rotta
      router.push({ name: route });
    };

    return {
      loading, 
      wishList,
      cart,
      store, // Aggiungi store per accedere al metodo openCart
      navigateTo,
    };
  },
};
</script>

<style scoped>
nav {
  height: 8rem;
  background-color: rgb(198, 23, 81);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
}

a {
  padding: 0 1rem;
  color: white;
  text-decoration: none;
}

a:hover {
  font-size: 1.2rem;
  text-decoration: none;
}

.logo {
  width: 5rem;
  border-radius: 5rem;
}

img {
  width: 100%;
  object-fit: cover;
  object-position: center;
}

.navbar {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: cover;
  background-position: center;
  animation: backgroundChange 8s infinite;
  transition: background-image 0.5s ease-in-out;
  border-bottom: 2px white solid;
}

.cart-item-count {
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 0 5px;
  margin-left: 5px;
}

.menu-mobile {
  background-color:  rgb(250, 0, 83);
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

button {
  color: #fbe8ea6b;
  border-color: #ffffff;
}

.open-card {
  border: none;
  color: white;
}

.open-card:hover {
  color: blue;
  font-size: 1.2rem;
  text-decoration: none;
}

.ship {
  position: absolute;
  top: 0;
  width: 100%;
  height: 1.5rem;
}

@media only screen and (max-width: 767.98px) {
  .menu-mobile {
    background-color: rgb(250, 0, 83);
    border-radius: 1rem;
    padding: 1.5rem;
    box-shadow: 0 0.6rem 1.2rem rgba(0, 0, 0, 0.858);
    display: flex;
    flex-direction: column;
  }

  .menu-mobile a, .menu-mobile .open-card {
    width: 100%;
    text-align: left;
    padding: 0.5rem 0;
    display: block;
  }

  .menu-mobile a:hover, .menu-mobile .open-card:hover {
    font-size: 1.2rem;
  }
}
</style>