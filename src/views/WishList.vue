<script>
import Swal from 'sweetalert2'; // Importa SweetAlert2
import { store } from '../store'; // Adjust the path as necessary
import Cart from '../components/Cart.vue';
import AppFooter from '../components/AppFooter.vue';

export default {
  name: "WishList",
  components: {
    AppFooter,
    Cart 
  },
  computed: {
    wishList() {
      return store.wishList; 
    }
  },
  methods: {
    removeFromWishList(item) {
      store.removeFromWishList(item); // Chiama la funzione dal store
    },
    openCart() {
      const offcanvasElement = document.getElementById('cartOffcanvas');
      const offcanvas = new bootstrap.Offcanvas(offcanvasElement);
      offcanvas.show();
    },
    addToCart(item) {
      // Logica per aggiungere l'item al carrello
      Swal.fire({
        title: 'Aggiunto al carrello!',
        text: `${item.title} è stato aggiunto al tuo carrello.`,
        icon: 'success',
        confirmButtonText: 'OK'
      });
      // Aggiungi l'item al carrello nel tuo store
      store.addToCart(item);
    }
  }
}
</script>

<template>
  <div>
    <AppHeader @open-cart="openCart" />

    <div class="wishlist-container">
      <h2 class="wishlist-title">Wish List</h2>
      <div v-if="wishList.length > 0" class="card-container">
        <div class="card-wrapper" v-for="item in wishList" :key="item.id">
          <div class="card">
            <router-link :to="`/manga/${item.slug}`" class="card-link">
              <div class="img-container">
                <img :src="item.cover_image" class="card-img" alt="" />
              </div>
              <div class="card-body">
                <h6 class="card-title">{{ item.title }}</h6>
                <p class="card-price">€{{ item.price }}</p>
              </div>
            </router-link>
            <div class="button-container">
              <button class="removeFromWishList" @click.stop="removeFromWishList(item)">
                <i class="fa-solid fa-trash"></i>
              </button>
              <button class="addToCart" @click.stop="addToCart(item)">Aggiungi al Carrello <i class="fa-solid fa-cart-shopping"></i></button>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="empty-img-container d-flex justify-content-center">
          <img src="https://cdn.anisearch.it/images/character/screen/111/111318/full/625652.webp" alt="" style="width: 46rem;">
        </div>
        <p class="empty-message">La tua wishlist è vuota.</p>
      </div>
      <div class="controller-buttons">
        <router-link :to="{ name: 'AppHome' }">
          <button class="btn-home">Torna alla homepage</button>
        </router-link>
      </div>
    </div>

    <!-- Offcanvas per il carrello -->
    <Cart /> 

    <AppFooter />
  </div>
</template>

<style scoped>
/* Stili esistenti */
.wishlist-container {
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  overflow-x: hidden; 
}

.card-img {
  width: 100%; 
  height: auto; 
  object-fit: cover; 
  transition: transform 0.3s;
}

.img-container {
  height: 20rem; 
  overflow: hidden; 
  width: 100%; 
}

.wishlist-title {
  text-align: center;
  margin-bottom: 20px;
  font-size: 2rem;
  color: #333;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
}

.card-wrapper {
  flex: 0 0 250px; 
  margin-bottom: 2rem;
}

.card {
  border-radius: 1rem;
  overflow: hidden;
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0.1);
  transition: transform 0.2s;
}

.card:hover {
  transform: scale(1.05);
}

.card-link {
  text-decoration: none;
  color: inherit;
}

.img-container {
  height: 20rem;
  overflow: hidden;
}

.card-img {
  width: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.card-body {
  padding: 15px;
  text-align: center;
}

.card-title {
  font-size: 1.2rem;
  margin: 0.5rem 0;
  color: #333;
}

.card-price {
  font-weight: bold;
  color: #e91e63;
}

.button-container {
  display: flex;
  justify-content: space-between;
  padding: 10px;
}

.removeFromWishList, .addToCart {
  padding: 0.5rem 1rem;
  border: none;
  border: 0.1rem solid rgb(250, 0, 83);
  border-radius: 0.5rem;
  color: rgb(250, 0, 83);
  cursor: pointer;
  transition: background-color 0.3s;
  background-color: white;
}

.addToCart {
  padding: 0.5rem;
  border: none;
  border-radius: 0.5rem;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
  background-color: rgb(250, 0, 83);
}

.removeFromWishList:hover {
  background-color: black;
  border: 0.1rem solid black;
  color: white;
}

.addToCart:hover {
  background-color: black;
  color: white;
}

.empty-message {
  text-align: center;
  font-size: 1.2rem;
  color: #d7d7d7;
}

.controller-buttons {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.btn-home {
  padding: 10px 20px;
  background-color: rgb(24, 55, 255);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-home:hover {
  background-color: rgb(20, 45, 200);
}

@media (max-width: 768px) {
  .card-wrapper {
    flex: 0 0 45%;
  }
}

@media (max-width: 576px) {
  .card-wrapper {
    flex: 0 0 100%; 
  }

  .wishlist-title {
    font-size: 1.5rem; 
  }

  .btn-home {
    width: 100%; 
  }
}
</style>