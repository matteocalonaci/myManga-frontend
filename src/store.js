// store.js
import { reactive } from 'vue';

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
    const index = this.wishList.findIndex(existingItem => existingItem.id === item.id);
    if (index !== -1) {
      this.wishList.splice(index, 1);
      this.updateLocalStorage();
      console.log(`${item.title} rimosso dalla wishlist.`);
    } else {
      console.log(`${item.title} non è nella wishlist.`);
    }
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

