<!-- JS -->
<script>
import { store } from '../store'; // Adjust the path as necessary

export default {
  name: "WishList",
  computed: {
    wishList() {
      return store.wishList; // Access the shared wishlist
    }
  }
}
</script>


<!-- HTML -->
<template>
    <div>
      <p class="mt-5"><b>Wish List</b></p>
      <div v-if="wishList.length > 0">
        <ul>
          <li v-for="item in wishList" :key="item.id">{{ item.title }}</li>
        </ul>
      </div>
      <div v-else>
        <p>La tua wishlist è vuota.</p>
      </div>
      <button>
        <router-link :to="{ name: 'AppHome' }" class="text-white">Torna alla homepage</router-link>
      </button>
    </div>
  </template>


<!-- CSS -->
<style scoped>
p {
    font-size: 5rem;
    padding: 2rem;
}

button {
    background-color: rgb(24, 55, 255);
}
</style>
