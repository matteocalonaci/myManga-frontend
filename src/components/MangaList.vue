<script>
import axios from 'axios';
import LoadingScreen from './LoadingScreen.vue';
import Single_Manga from './Single_Manga.vue';
import Swal from 'sweetalert2';
import { store } from '../store'; // Adjust the path as necessary



export default {
    name: 'MangaList',
    components: {
        LoadingScreen,
        Single_Manga
    },
    data() {
        return {
            base_url: 'http://localhost:8000/',
            mangas: [],
            loading: false,
            currentPage: 1,
            filteredMangas: [],
            totalPages: 0,
            filterQuery: '',
            wishList: [], // Mantieni la wishlist
        }
    },
    mounted() {
        this.getMangas();
        this.getWishList(); // Carica la wishlist all'avvio
    },
    methods: {
        getMangas() {
            this.loading = true;
            const url = `${this.base_url}api/mangas?page=${this.currentPage}`;
            axios.get(url)
                .then(response => {
                    this.mangas = response.data.mangas.data;
                    this.totalPages = response.data.mangas.last_page;
                    this.filteredMangas = this.mangas;
                })
                .catch(error => {
                    console.error("Si è verificato un errore durante il recupero dei manga:", error);
                })
                .finally(() => {
                    this.loading = false;
                });
        },

        getWishList() {
            const storedWishList = localStorage.getItem("wishList");
            if (storedWishList) {
                this.wishList = JSON.parse(storedWishList);
            } else {
                this.wishList = [];
            }
        },

        toggleWishList(manga) {
            const exists = store.wishList.some(item => item.id === manga.id);
            if (!exists) {
                store.wishList.push(manga); // Add to wishlist
                Swal.fire({
                    title: 'Aggiunto!',
                    text: `${manga.title} è stato aggiunto alla lista desideri!`,
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            } else {
                store.wishList = store.wishList.filter(item => item.id !== manga.id); // Remove from wishlist
                Swal.fire({
                    title: 'Rimosso!',
                    text: `${manga.title} è stato rimosso dalla lista desideri!`,
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            }
            localStorage.setItem("wishList", JSON.stringify(store.wishList)); // Update localStorage
        },

        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.getMangas();
            }
        },

        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
                this.getMangas();
            }
        },
    },
    computed: {
        currentWishList() {
            return this.wishList; // This will automatically update when wishList changes
        }
    }
}
</script>

<template>
    <div v-if="mangas.length > 0">
        <div class="container" style="background-color: rgb(250, 0, 83);">
            <hr>
            <div class="row mt-5">
                <div class="col-12">
                    <div class="card-container">
                        <div v-for="manga in mangas" :key="manga.id" class="card-wrapper">
                            <Single_Manga :manga="manga" :wishList="wishList" @add-to-wishlist="toggleWishList"
                                @remove-from-wishlist="toggleWishList" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="pagination">
            <div class="controller-buttons">
                <button @click="prevPage" :disabled="currentPage === 1"> <i class="fa-solid fa-angle-left"></i>
                    Precedente</button>
                <span> Pagina {{ currentPage }} di {{ totalPages }}</span>
                <button @click="nextPage" :disabled="currentPage === totalPages">Successivo <i
                        class="fa-solid fa-angle-right"></i></button>
            </div>
        </div>
    </div>
    <LoadingScreen v-if="loading" />
</template>

<style scoped>
.card-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 1rem;
}

.card-wrapper {
    width: calc((100% / 4) - 1rem);
    margin-bottom: 2rem;
}

.pagination {
    display: flex;
    justify-content: center;
}

.controller-buttons {
    background-color: white;
    padding: 0.5rem 2rem;
    border-radius: 2rem;
    margin-bottom: 2rem;
}

.controller-buttons button {
    border: none;
    background-color: white;
}

.controller-buttons button:hover {
    color: rgb(250, 0, 83);
}

@media (max-width: 768px) {
    .card-wrapper {
        width: calc((100% / 2) - 1rem);
    }
}

@media (max-width: 576px) {
    .card-wrapper {
        width: 100%;
    }
}
</style>