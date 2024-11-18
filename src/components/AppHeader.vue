      <script>
      import LoadingScreen from './LoadingScreen.vue';
      import { store } from '../store';
      
      export default {
        name: 'AppHeader',
        components: { LoadingScreen },
      
        computed: {
          wishList() {
            return store.wishList;
          },
          wishListCount() {
            return this.wishList.length;
          }
        }
      }
      </script>
<template>
  <nav class="navbar navbar-expand-sm">
    <div class="container-fluid">
      <img class="logo" src="../assets/img/kana_logo.jpeg" alt="">

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <div class="menu-mobile d-flex justify-content-between">
            <div>
              <router-link to="/" @click="notify('Sei tornato alla Home!')">
                <i class="fa-solid fa-cart-shopping"></i> Home
              </router-link>

              <router-link to="/wish-list" @click="notify('Hai aperto la tua lista desideri!')">
                <i class="fa-regular fa-heart" :class="{ 'animate-heart': wishListCount > 0 }"></i>
                Lista desideri (<span class="wishlist-count">{{ wishListCount }}</span>)
              </router-link>

              <router-link to="/cart" @click="notify('Hai aperto il carrello!')">
                <i class="fa-solid fa-cart-shopping"></i> Carrello
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
  <LoadingScreen v-if="loading" />
</template>


<style scoped>
nav {
  height: 7rem;
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
  font-size: 14px;
}

.menu-mobile {
  background-color: rgba(250, 0, 83, 0.384);
  border-radius: 1rem;
  padding: 1rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

button {
  color: #bb2d3b;
  border-color: #bb2d3b;
}
</style>