// store.js
import { reactive } from 'vue';
import Swal from 'sweetalert2';

const initialWishList = JSON.parse(localStorage.getItem("wishList")) || [];
console.log("Initial wishlist:", initialWishList);

export const store = reactive({
  wishList: initialWishList,

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
          this.wishList.splice(index, 1); // Rimuovi l'elemento dalla wishlist
          this.updateLocalStorage(); // Aggiorna il localStorage
          Swal.fire(
            'Rimosso!',
            `${item.title} è stato rimosso dalla wishlist.`,
            'success'
          );
        } else {
          Swal.fire(
            'Errore!',
            `${item.title} non è nella wishlist.`,
            'error'
          );
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
    localStorage.setItem("wishList", JSON.stringify(this.wishList));
  }
});