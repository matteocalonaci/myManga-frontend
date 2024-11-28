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
            wishList: [],
            authors: [],
            genres: [],
            editors: [],
            categories: [],
            selectedAuthor: '',
            selectedGenre: '',
            selectedEditors: '',
            selectedCategory: '',
        }
    },
    mounted() {
        this.getMangas(); // Carica i manga iniziali
        this.getWishList();
    },
    methods: {
        getMangas() {
            this.loading = true;
            const url = `${this.base_url}api/mangas`;
            axios.get(url, {
                params: {
                    per_page: 100 // Carica un numero maggiore di manga per il filtraggio
                }
            })
            .then(response => {
                this.mangas = response.data.mangas.data;
                this.filteredMangas = this.mangas; // Inizialmente, i manga filtrati sono tutti
                this.totalPages = Math.ceil(this.filteredMangas.length / 12); // Calcola il numero totale di pagine
                this.authors = response.data.authors || [];
                this.genres = response.data.genres || [];
                this.editors = response.data.editors || [];
                this.categories = response.data.categories || [];
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
            this.wishList = storedWishList ? JSON.parse(storedWishList) : [];
        },

        toggleWishList(manga) {
            const exists = store.wishList.some(item => item.id === manga.id);
            if (!exists) {
                store.wishList.push(manga);
                Swal.fire({
                    title: 'Aggiunto!',
                    text: `${manga.title} è stato aggiunto alla lista desideri!`,
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            } else {
                store.wishList = store.wishList.filter(item => item.id !== manga.id);
                Swal.fire({
                    title: 'Rimosso!',
                    text: `${manga.title} è stato rimosso dalla lista desideri!`,
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            }
            localStorage.setItem("wishList", JSON.stringify(store.wishList));
        },

        changePage(page) {
            if (page >= 1 && page <= this.totalPages) {
                this.currentPage = page;
            }
        },

        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },

        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
            }
        },

        applyFilters() {
            // Applica i filtri sui manga caricati
            this.filteredMangas = this.mangas.filter(manga => {
                const matchesAuthor = this.selectedAuthor ? manga.author_id === this.selectedAuthor : true;
                const matchesGenre = this.selectedGenre ? manga.genres.some(genre => genre.id === this.selectedGenre) : true;
                const matchesCategory = this.selectedCategory ? manga.category_id === this.selectedCategory : true;
                const matchesEditor = this.selectedEditors ? manga.editor_id === this.selectedEditors : true;
                const matchesSearch = this.filterQuery ? manga.title.toLowerCase().includes(this.filterQuery.toLowerCase()) : true;

                return matchesAuthor && matchesGenre && matchesCategory && matchesEditor && matchesSearch;
            });

            this.totalPages = Math.ceil(this.filteredMangas.length / 12); // Ricalcola il numero totale di pagine
            this.currentPage = 1; // Resetta alla prima pagina dopo l'applicazione dei filtri
        }
    },
    computed: {
        currentWishList() {
            return this.wishList;
        },
        paginatedMangas() {
            const start = (this.currentPage - 1) * 12;
            return this.filteredMangas.slice(start, start + 12); // Restituisce solo i manga per la pagina corrente
        }
    }
}
</script>
<template>
    <div v-if="mangas.length > 0">
        <div class="container" style="background-color: rgb(250, 0, 83);">
            <div class="row mt-5">
                <div class="col-12">
                    <div class="search-filters d-flex justify-content-center">
                        <input type="text" v-model="filterQuery" placeholder="Cerca per titolo..."
                        @input="applyFilters" />
                        <select v-model="selectedAuthor" @change="applyFilters">
                            <option value="">Seleziona Autore</option>
                            <option v-for="author in authors" :key="author.id" :value="author.id">{{ author.name }}</option>
                        </select>
                        <select v-model="selectedGenre" @change="applyFilters">
                            <option value="">Seleziona Genere</option>
                            <option v-for="genre in genres" :key="genre.id" :value="genre.id">{{ genre.name }}</option>
                        </select>
                        <select v-model="selectedEditors" @change="applyFilters">
                            <option value="">Seleziona Editore</option>
                            <option v-for="editor in editors" :key="editor.id" :value="editor.id">{{ editor.name }}</option>
                        </select>
                        <!-- inutile -->
                        <!-- <select v-model="selectedCategory" @change="applyFilters">
                            <option value="">Seleziona Categoria</option>
                            <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
                        </select> -->
                    </div>
                    <hr>
                    <div class="card-container d-flex justify-content-center align-items-center">
                        <div v-if="paginatedMangas.length === 0" class="">
                            <div class="empty-card-container position-relative d-flex justify-content-center align-items-center">
                                <img src="../assets/img/sad-kana.webp" alt="sad-kana" style="width: 40rem;">
                                <p class="text position-absolute bottom-0"><b>NESSUN RISULTATO TROVATO</b></p>
                            </div>
                        </div>
                        <div v-for="manga in paginatedMangas" :key="manga.id" class="card-wrapper">
                            <Single_Manga :manga="manga" :wishList="wishList" @add-to-wishlist="toggleWishList"
                                @remove-from-wishlist="toggleWishList" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="pagination">
            <div class="controller-buttons">
                <button v-for="page in totalPages" 
                        :key="page" 
                        @click="changePage(page)" 
                        :class="{ active: currentPage === page }">
                    {{ page }}
                </button>
            </div>
        </div>
        <LoadingScreen v-if="loading" />
    </div>
</template>

<style scoped>
.search-filters {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 1rem;
}

.search-filters input,
.search-filters select {
    padding: 0.5rem;
    border-radius: 0.5rem;
    border: 1px solid #ccc;
}

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

.controller .buttons button:hover {
    color: rgb(250, 0, 83);
}

.text {
    padding: 0 0.5rem;
    background-color: black;
    color: white;
    font-size: 2rem;
}

.empty-card-container {
    margin: 2rem;
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

    .empty-card-container {
        margin: 2rem;
    }

    .text {
        padding: 0 0.5rem;
        background-color: black;
        color: white;
        font-size: 1.5rem;
    }
}
</style>