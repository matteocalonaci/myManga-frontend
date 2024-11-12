<script>
import axios from 'axios';


export default {
  name: 'Single_Manga',
  props: ['manga'],
  data() {
    return {
      base_url: 'http://localhost:8000/',
      mangas: [],
      loading: false,
      currentPage: 1,
      filteredMangas: [],
      totalPages: 0,
      filterQuery: ''
    }
  },
  mounted() {
    this.getMangas();

  },
  methods: {
    getMangas() {
      this.loading = true; // Imposta loading a true prima di fare la richiesta
      const url = `${this.base_url}api/mangas?page=${this.currentPage}`;
      axios.get(url)
        .then(response => {
          console.log("Risposta dell'API:", response.data);
          // Accedi ai dati dei manga correttamente
          this.mangas = response.data.mangas.data; // Assicurati di accedere ai dati correttamente
          this.totalPages = response.data.mangas.last_page; // Assicurati di accedere a last_page se presente
          this.filteredMangas = this.mangas; // Inizializza filteredMangas
        })
        .catch(error => {
          console.error("Si è verificato un errore durante il recupero dei manga:", error);
        })
        .finally(() => {
          this.loading = false; // Imposta loading a false alla fine
        });
    }

  }
}

</script>

<template>
  <div class="card" :style="{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)' }">
    <div class="img-container" :style="{ borderRadius: '10px 10px 0 0' }">
      <img :src="manga.cover_image" class="card-img-top img-fluid" alt=""
        style=" object-fit: cover; border-radius: 10px 10px 0 0;">
    </div>
    <div class="card-body">
      <h6 class="card-title pb-2 text-center">{{ manga.title }}</h6>
      <div class="row">
        <div class="col-12 text-center">
          <p class="card-text"><b>€{{ manga.price }}</b></p>
        </div>
        <div class="col-12 d-flex justify-content-center">
          <button class="addToCart mt-2">Aggiungi al carrello</button>
          <!-- <div class="input-group mb-3">
            <input type="number" class="form-control" v-model="quantity" min="1" max="10" ref="quantityInput">
            <div class="input-group-append">
              <button class="btn btn-primary" @click="addToCart(dish, quantity)">+</button>
            </div>
          </div> -->
        </div>
      </div>
    </div>
  </div>
  <!-- confirm box -->
  <div id="confirm" style="display: none;">
    <p id="confirm-message"></p>
    <button class="m-1 btn btn-primary" id="yes-button">Sì</button>
    <button class="m-1 btn btn-secondary" id="no-button">No</button>
  </div>
  <!-- alert -->
  <div id="info" style="display: none;">
    <p id="info-message"></p>
    <button class="m-1 btn btn-primary" id="okey-button">Chiudi</button>
  </div>
</template>


<style scoped>


.addToCart{
  background-color:rgb(250, 0, 83);
  color: white;
  border-radius: 2rem;
  padding: 0.5rem 1rem;
  border: none;
}

.addToCart:hover{
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