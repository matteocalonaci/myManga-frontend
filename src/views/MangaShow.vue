<script>
import axios from 'axios';
import LoadingScreen from '../components/LoadingScreen.vue';

export default {
    name: 'MangaShow',
    components: {
        LoadingScreen,

    },
    data() {
        return {
            base_url: 'http://localhost:8000/',
            manga: null,
            loading: true,
            isLiked: false,
        };
    },
    mounted() {
        this.getManga();
    },
    methods: {
        getManga() {
            const slug = this.$route.params.slug; // Ottieni lo slug dalla rotta
            const url = `${this.base_url}api/mangas/${slug}`;

            axios.get(url)
                .then(response => {
                    console.log("Risposta dell'API:", response.data);
                    this.manga = response.data.manga; 
                })
                .catch(error => {
                    console.error("Si è verificato un errore durante il recupero del manga:", error);
                })
                .finally(() => {
                    this.loading = false; 
                });
        },
        toggleLike() {
            this.isLiked = !this.isLiked; 
        },
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
    },
};
</script>
<template>
    <LoadingScreen v-if="loading" />

    <div v-else-if="manga">
        <div class="col-12 p-5 d-flex justify-content-between">
            <div class="col-5">
                <div class="img-container" :style="{ borderRadius: '10px 10px 0 0' }">
                    <img :src="manga.cover_image" class="card-img-top img-fluid" alt=""
                        style="object-fit: cover; border-radius: 10px 10px 0 0;">
                    <i :class="['fa-heart text-danger', isLiked ? 'fa-solid' : 'fa-regular']" @click.stop="toggleLike"
                        :style="iconStyle" style="cursor: pointer;"></i>
                </div>
            </div>
            <div class="col-7 px-5">
                <div class="card-body">
    <h2 class="card-title"><b>{{ manga.title }}</b></h2>
    <h5 class="card-text mt-3 mb-4"><b>€{{ manga.price }}</b></h5>
    <p class="card-text"><span class="th">Generi:</span> 
        <span class="genre" v-for="genre in manga.genres" :key="genre.id"> {{ genre.name }}</span>
    </p>
    <p class="card-text"><span class="th">Autore:</span> {{ manga.authors.name }}</p>
    <p class="card-text"><span class="th">Volume:</span> {{ manga.volume }}</p>
    <p class="card-text"><span class="th">Disponibilità:</span> {{ manga.availability ? 'Disponibile' : 'Non disponibile' }}</p>
    <p class="card-text"><span class="th">In corso? </span> {{ manga.in_progress ? 'Sì' : 'No' }}</p>
    <p class="card-text"><span class="th">Anno di Pubblicazione: </span>{{ manga.year }}</p>
    <p class="card-text"><span class="th">Categoria: </span> {{ manga.categories.name }}</p>
    <p class="card-text"><span class="th">Editore: </span> {{ manga.editors.name }}</p>
    <p class="card-text">{{ manga.description }}</p>
    <div class="text-center">
        <button class="addToCart mt-2">Aggiungi al carrello</button>
    </div>
</div>

            </div>
        </div>
    </div>
    <div v-else>
        <p>Manga non trovato.</p>
    </div>
</template>


<style scoped>

.genre {
  margin: 0.5rem;
  padding: 0.5rem;
  color: white;
  background-color: rgb(250, 0, 83);

  border-radius: 2rem;
}
.fa-heart {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    font-size: 1.5rem;
    transition: color 0.3s ease;
}

.addToCart {
    background-color: rgb(250, 0, 83);
    color: white;
    border-radius: 2rem;
    padding: 0.5rem 1rem;
    border: none;
}

.addToCart:hover {
    background-color: black;
    color: white;
}

.card-body{
    background-color: white;
    padding: 1rem;
    border-radius: 2rem
}

.th{
    color:rgb(250, 0, 83);
    font-weight: bold;
}

</style>