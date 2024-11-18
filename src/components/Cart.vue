<script>
import Swal from 'sweetalert2'; // Importa SweetAlert2
import { store } from '../store'; // Adjust the path as necessary

export default {
  name: "Cart",
  computed: {
    cartItems() {
      return store.cart; 
    },
    cartTotal() {
      // Calcola il totale del carrello, assicurandoti che price sia definito e sia un numero
      const total = this.cartItems.reduce((sum, item) => {
        const price = parseFloat(item.price); // Assicurati che price sia un numero
        return sum + (isNaN(price) ? 0 : price); // Usa 0 se price non è un numero
      }, 0);
      return total.toFixed(2); // Restituisci il totale formattato
    }
  },
  methods: {
    removeFromCart(manga) {
      Swal.fire({
        title: 'Sei sicuro?',
        text: `Vuoi rimuovere ${manga.title} dal carrello?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sì, rimuovi!',
        cancelButtonText: 'Annulla'
      }).then((result) => {
        if (result.isConfirmed) {
          store.removeFromCart(manga); // Rimuovi l'elemento dal carrello
        }
      });
    },

    clearCart() {
      Swal.fire({
        title: 'Sei sicuro?',
        text: "Vuoi svuotare il carrello?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sì, svuota!',
        cancelButtonText: 'Annulla'
      }).then((result) => {
        if (result.isConfirmed) {
          store.clearCart(); // Svuota il carrello
          Swal.fire('Svuotato!', 'Il carrello è stato svuotato.', 'success');
        }
      });
    }
  }
}
</script>

<template>
  <div class="offcanvas offcanvas-end" tabindex="-1" id="cartOffcanvas" aria-labelledby="cartOffcanvasLabel">
    <div class="offcanvas-header">
      <h5 id="cartOffcanvasLabel">Carrello</h5>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
      <p v-if="cartItems.length === 0">Il carrello è vuoto.</p>
      <ul class="list-group">
        <li v-for="manga in cartItems" :key="manga.id" class="list-group-item d-flex justify-content-between align-items-center">
          <div>
            <strong>{{ manga.title }}</strong>
            <p>€{{ (parseFloat(manga.price) || 0).toFixed(2) }}</p>
          </div>
          <button class="btn btn-danger btn-sm" @click="removeFromCart(manga)">Rimuovi</button>
        </li>
      </ul>
      <div v-if="cartItems.length > 0" class="mt-3">
        <h6>Totale: €{{ cartTotal }}</h6>
        <button class="btn btn-warning" @click="clearCart">Svuota Carrello</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.offcanvas-body {
  max-height: 70vh; 
  overflow-y: auto;
}
</style>