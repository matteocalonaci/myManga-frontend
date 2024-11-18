// store.js
import { reactive } from 'vue';

const initialWishList = JSON.parse(localStorage.getItem("wishList")) || [];
console.log("Initial wishlist:", initialWishList);

export const store = reactive({
  wishList: initialWishList,

  addToWishList(item) {
    if (!this.wishList.includes(item)) {
      this.wishList.push(item);
      this.updateLocalStorage();
    }
  },

  removeFromWishList(item) {
    const index = this.wishList.indexOf(item);
    if (index !== -1) {
      this.wishList.splice(index, 1);
      this.updateLocalStorage();
    }
  },

  updateLocalStorage() {
    localStorage.setItem("wishList", JSON.stringify(this.wishList));
  }
});