<template>
  <div class="offcanvas offcanvas-end" tabindex="-1" id="cartOffcanvas" aria-labelledby="cartOffcanvasLabel">
    <div class="offcanvas-header">
      <h3 id="cartOffcanvasLabel" class="text-white"><b>Carrello</b></h3>
      <button type="button" class="btn-close" @click="closeCart" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
      <p v-if="cartItems.length === 0">Il carrello è vuoto.</p>
      <div v-if="cartItems.length > 0" class="mb-3">
        <button class="btn btn-danger" @click="confirmClearCart">Svuota Carrello</button>
      </div>
      <ul class="list-group">
        <li v-for="manga in cartItems" :key="manga.id" class="list-group-item d-flex justify-content-between align-items-center">
          <div class="d-flex align-items-center">
            <img :src="manga.cover_image" alt="Immagine di {{ manga.title }}" class="manga-image" />
            <div class="ms-3">
              <strong>{{ manga.title }}</strong>
              <p>€{{ (parseFloat(manga.price) || 0).toFixed(2) }} x {{ manga.quantity }}</p>
              <div class="quantiy-btn d-flex align-items-center mb-2 mb-md-0">
                <button @click="decreaseQuantity(manga)" class="pulsanti">-</button>
                <span class="quantity mx-2">{{ manga.quantity }}</span>
                <button @click="increaseQuantity(manga)" class="pulsanti">+</button>
              </div>
            </div>
          </div>
          <button class="btn btn-danger btn-sm" @click="removeFromCart(manga)">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </li>
      </ul>
      <div v-if="cartItems.length > 0" class="mt-3">
        <h6 class="d-flex justify-content-between">Totale parziale: <span>€{{ cartTotal }}</span></h6>
        <h6 class="d-flex justify-content-between">
 Spedizione: 
          <span>
            {{ shippingCost > 0 ? '€' + shippingCost.toFixed(2) : 'Gratis' }}
          </span>
        </h6>          
        <h5 class="d-flex justify-content-between">Totale: <b><span>€{{ (parseFloat(cartTotal) + shippingCost).toFixed(2) }}</span></b></h5>

        <hr>
        <h4 class="text-center" v-if="remainingForFreeShipping > 0">
          Ti mancano ancora <b>€{{ remainingForFreeShipping.toFixed(2) }}</b> per avere la <b>spedizione gratuita!</b>
        </h4>

        <hr>
        <div class="checkout-container-button d-flex justify-content-center">
          <router-link to="checkout">
            <button class="checkout-button">Procedi con il checkout</button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'; 
import { store } from '../store'; 

export default {
  name: "Cart",
  computed: {
    cartItems() {
      return store.cart; 
    },
    cartTotal() {
      const total = this.cartItems.reduce((sum, item) => {
        const price = parseFloat(item.price); 
        return sum + (isNaN(price) ? 0 : price * item.quantity);
      }, 0);
      return total.toFixed(2); 
    },
    shippingCost() {
      const thresholdForFreeShipping = 39; 
      return parseFloat(this.cartTotal) < thresholdForFreeShipping ? 5.50 : 0; 
    },
    remainingForFreeShipping() {
      const thresholdForFreeShipping = 39; 
      return Math.max(0, thresholdForFreeShipping - parseFloat(this.cartTotal)); 
    }
  },
  methods: {
    closeCart() {
      store.closeCart(); 
    },
    confirmClearCart() {
      Swal.fire({
        title: 'Sei sicuro?',
        text: "Vuoi svuotare il carrello?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sì, svuota!'
      }).then((result) => {
        if (result.isConfirmed) {
          store.clearCart(); 
          Swal.fire('Svuotato!', 'Il carrello è stato svuotato.', 'success');
        }
      });
    },
    increaseQuantity(manga) {
      store.increaseQuantity(manga); 
    },
    decreaseQuantity(manga) {
      if (manga.quantity > 1) {
        store.decreaseQuantity(manga); 
      }
    },
    removeFromCart(manga) {
      store.removeFromCart(manga); 
    },
    handleClickOutside(event) {
      const offcanvas = this.$el.querySelector('.offcanvas');
      if (offcanvas && !offcanvas.contains(event.target)) {
        this.closeCart(); 
      }
    }
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.handleClickOutside);
  }
}
</script>

<style scoped>
.offcanvas-body {
  max-height: 100vh; 
  overflow-y: scroll; 
  color: white;
  background-color: rgb(198, 23, 81);
}

.offcanvas-body::-webkit-scrollbar {
  display: none; 
}
.offcanvas-end {
  background-color: rgb(198, 23, 81);
}

.manga-image {
  width: 6rem; 
  height: auto; 
  border-radius: 5px; 
}

.quantiy-btn {
  padding: 0.1rem 0.8rem;
  width: 6rem;
  border-radius: 2rem;
  color: rgb(250, 0, 83);
  border: 0.1rem solid rgb(250, 0, 83);
}

.pulsanti {
  border: none;
  color: rgb(250, 0, 83);
  background-color: white;
  font-size: 1rem;
}

.quantiy-btn:hover {
  background-color: black;
  color: white;
  border: 0.1rem solid black;
}

.quantiy-btn:hover .pulsanti {
  color: white;
  background-color: black;
}

.checkout-button {
  padding: 1rem 2rem;
  background-color: rgb(250, 0, 83);
  border-radius: 2rem;
  border: none;
  border: 0.1rem solid white;
  color: white;
}
</style>