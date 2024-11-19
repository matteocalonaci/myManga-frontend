<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import { store } from '../store'; // Assicurati che il percorso sia corretto
import Cart from './Cart.vue'; // Assicurati che il percorso sia corretto

export default {
  name: 'Single_Manga',
  props: ['manga', 'wishList'],
  components: {
    Cart
  },
  data() {
    return {
      base_url: 'http://localhost:8000/',
      mangas: [],
      loading: false,
      currentPage: 1,
      filteredMangas: [],
      totalPages: 0,
      filterQuery: '',
      isLiked: false,
    };
  },
  methods: {
    getMangas() {
      this.loading = true;
      const url = `${this.base_url}api/mangas?page=${this.currentPage}`;
      axios.get(url)
        .then(response => {
          this.mangas = response.data.mangas.data;
          this.totalPages = response.data.mangas.last_page;
          this.filteredMangas = this.mangas;
        })
        .catch(error => {
          console.error("Si è verificato un errore durante il recupero dei manga:", error);
        })
        .finally(() => {
          this.loading = false; // Imposta loading a false anche in caso di errore
        });
    },

    toggleLike() {
      this.isLiked = !this.isLiked;
      if (this.isLiked) {
        this.addWishList();
      } else {
        this.removeWishList();
      }
    },

    addWishList() {
      store.addToWishList(this.manga); // Usa il metodo del store
    },

    removeWishList() {
      store.removeFromWishList(this.manga); // Usa il metodo del store
    },

    getWishList() {
      this.isLiked = store.wishList.some(item => item.id === this.manga.id);
    },

    addToCart(manga) {
      store.addToCart(manga); // Usa il metodo del store
    },
  },

  mounted() {
    this.getMangas();
    this.getWishList();
    this.isLiked = store.wishList.some(item => item.id === this.manga.id);
  },

  computed: {
    iconStyle() {
      return {
        backgroundColor: 'black',
        borderRadius: '50%',
        padding: '0.5rem',
        display: 'inline-block',
        color: this.isLiked ? 'red' : 'black',
      };
    },
    truncatedTitle() {
      const maxLength = 30; // Imposta il numero massimo di caratteri
      return this.manga.title.length > maxLength ? this.manga.title.substring(0, maxLength) + '...' : this.manga.title;
    }
  }
}
</script>

<template>
  <div class="card" :style="{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)' }">
    <div class="img-container" :style="{ borderRadius: '10px 10px 0 0' }">
      <router-link :to="`/manga/${manga.slug}`" style="text-decoration: none; color: inherit;" class="card-link">
        <img :src="manga.cover_image" class="card-img-top img-fluid" alt=""
          style="object-fit: cover; border-radius: 10px 10px 0 0;">
      </router-link>
    </div>
    <div class="card-body">
      <h6 class="card-title pb-2 text-center">{{ truncatedTitle }}</h6>
      <div class="row">
        <div class="col-12 text-center">
          <p class="card-text"><b>€{{ manga.price }}</b></p>
        </div>
        <div class="col-12 d-flex justify-content-center">
          <button @click.stop="addToCart(manga)" class="addToCart mt-2">Aggiungi al carrello</button>
        </div>
      </div>
    </div>
    <i :class="['fa-heart text-danger', isLiked ? 'fa-solid' : 'fa-regular']" @click.stop ="toggleLike" :style="iconStyle" style="cursor: pointer;"></i>

    <!-- Carrello -->
    <Cart />
  </div>
</template>

<style scoped>
.fa-heart {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  font-size: 1.5rem;
  transition: color 0.3s ease;
}


.addToCart {
  padding: 0.5rem 2rem;
  background-color: rgb(250, 0, 83);
  border-radius: 2rem;
  border: none;
  color: white;
}

.addToCart:hover {
  background-color: black;
  color: white;
}

#confirm,
#info {
  position: fixed;
  z-index: 999;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #f0f0f0;
  border: 1px solid #fe1c1c;
  padding: 20px;
  display: none;
  border-radius: 1rem;
}

#confirm-message,
#info-message {
  font-size: 18px;
  margin-bottom: 20px;
}

#yes-button,
#no-button,
#okey-button {
  background-color: #fe1c1c;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

#yes-button:hover,
#no-button:hover,
#okey-button:hover {
  background-color: #d110108f;
}
</style>