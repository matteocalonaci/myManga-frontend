import { reactive } from 'vue';
import { useToast } from "vue-toastification";
import CustomToast from './components/CostumationToast.vue'; // Importa il tuo componente
import Swal from 'sweetalert2';

const initialWishList = JSON.parse(localStorage.getItem("wishList")) || [];
const initialCart = JSON.parse(localStorage.getItem("cart")) || []; // Inizializza il carrello

export const store = reactive({
  wishList: initialWishList,
  cart: initialCart,
  isCartVisible: false, 

  addToWishList(item) {
    const exists = this.wishList.some(existingItem => existingItem.id === item.id);
    if (!exists) {
      this.wishList.push(item);
      this.updateLocalStorage();
      console.log(`${item.title} aggiunto alla wishlist.`);
    } else {
      console.log(`${item.title} è già nella wishlist.`);
    }
  },

  removeFromWishList(item) {
    Swal.fire({
      title: 'Sei sicuro?',
      text: `Vuoi rimuovere ${item.title} dalla wishlist?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sì, rimuovi!',
      cancelButtonText: 'Annulla'
    }).then((result) => {
      if (result.isConfirmed) {
        const index = this.wishList.findIndex(existingItem => existingItem.id === item.id);
        if (index !== -1) {
          this.wishList.splice(index, 1);
          this.updateLocalStorage();
          Swal.fire('Rimosso!', `${item.title} è stato rimosso dalla wishlist.`, 'success');
        } else {
          Swal.fire('Errore!', `${item.title} non è nella wishlist.`, 'error');
        }
      }
    });
  },

  clearWishList() {
    this.wishList = [];
    this.updateLocalStorage();
    console.log("Wishlist svuotata.");
  },

  updateLocalStorage() {
    try {
      console.log('Aggiornamento del local storage con:', {
        wishList: this.wishList,
        cart: this.cart
      });
      localStorage.setItem("wishList", JSON.stringify(this.wishList));
      localStorage.setItem('cart', JSON.stringify(this.cart));
    } catch (error) {
      console.error('Errore durante l\'aggiornamento del local storage:', error);
    }
  },

  addToCart(manga) {
    const toast = useToast();
    console.log('Aggiungendo al carrello:', manga); 
    const exists = this.cart.find(existingManga => existingManga.id === manga.id);
    
    if (!exists) {
      this.cart.push({ ...manga, quantity: 1 });
      this.updateLocalStorage();
      console.log('Manga aggiunto al carrello:', manga);
      
      toast({
        component: CustomToast,
        props: {
          title: manga.title, 
          message: 'Aggiunto al carrello!', 
          image: manga.cover_image || manga.coverImage 
        }
      });
    } else {
      exists.quantity++;
      this.updateLocalStorage();
      toast({
        component: CustomToast,
        props: {
          title: manga.title, 
          message: 'Quantità aggiornata nel carrello.', 
        }
      });
    }
  },

  openCart() {
    this.isCartVisible = true; // Imposta la visibilità del carrello
    const cartOffcanvas = new bootstrap.Offcanvas(document.getElementById('cartOffcanvas'));
    cartOffcanvas.show(); // Mostra l'offcanvas
    console.log('Carrello aperto');
  },

  closeCart() {
    this.isCartVisible = false; // Nascondi il carrello
    const cartOffcanvas = bootstrap.Offcanvas.getInstance(document.getElementById('cartOffcanvas'));
    if (cartOffcanvas) {
      cartOffcanvas.hide(); // Nascondi l'offcanvas
      console.log('Carrello chiuso');
    }
  },

  removeFromCart(manga) {
    Swal.fire({
      title: 'Sei sicuro?',
      text: `Vuoi rimuovere ${manga.title} dal carrello?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '# d33',
      confirmButtonText: 'Sì, rimuovi!',
      cancelButtonText: 'Annulla'
    }).then((result) => {
      if (result.isConfirmed) {
        const index = this.cart.findIndex(existingManga => existingManga.id === manga.id);
        if (index !== -1) {
          this.cart.splice(index, 1);
          this.updateLocalStorage();
          Swal.fire('Rimosso!', `${manga.title} è stato rimosso dal carrello.`, 'success');
        } else {
          Swal.fire('Errore!', `${manga.title} non è nel carrello.`, 'error');
        }
      }
    });
  },

  clearCart() {
    this.cart = [];
    this.updateLocalStorage();
    console.log("Carrello svuotato.");
  },

  increaseQuantity(manga) {
    const exists = this.cart.find(existingManga => existingManga.id === manga.id);
    if (exists) {
      exists.quantity++;
      this.updateLocalStorage();
      console.log(`Quantità di ${manga.title} aumentata a ${exists.quantity}.`);
    }
  },

  decreaseQuantity(manga) {
    const exists = this.cart.find(existingManga => existingManga.id === manga.id);
    if (exists && exists.quantity > 1) {
      exists.quantity--;
      this.updateLocalStorage();
      console.log(`Quantità di ${manga.title} diminuita a ${exists.quantity}.`);
    } else if (exists && exists.quantity === 1) {
      this.removeFromCart(manga);
    }
  }
});