<template>
    <div>
        <LoadingScreen v-if="isLoading" /> <!-- Mostra il caricamento se isLoading è true -->
        <div v-if="!isLoading && filteredMangas.length > 0">
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
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import LoadingScreen from './LoadingScreen.vue';
import Single_Manga from './Single_Manga.vue';

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
            isLoading: false,
            currentPage: 1,
            filteredMangas: [],
            totalPages: 0,
            filterQuery: '',
            wishList: [],
            authors: [],
            genres: [],
            editors: [],
            selectedAuthor: '',
            selectedGenre: '',
            selectedEditors: '',
            mangasPerPage: 12, // Numero di manga per pagina
        }
    },
    computed: {
        paginatedMangas() {
            const start = (this.currentPage - 1) * this.mangasPerPage;
            const end = start + this.mangasPerPage;
            return this.filteredMangas.slice(start, end); // Restituisce i manga per la pagina corrente
        }
    },
    methods: {
        loadMangas() {
            this.isLoading = true;
            const url = `${this.base_url}api/mangas`;
            axios.get(url, {
                params: {
                    per_page: 100
                }
            })
            .then(response => {
                this.mangas = response.data.mangas.data;
                this.filteredMangas = this.mangas;
                this.totalPages = Math.ceil(this.filteredMangas.length / this.mangasPerPage); // Calcola il numero totale di pagine
                this.isLoading = false;
            })
            .catch(error => {
                console.error("Errore nel caricamento dei manga:", error);
                this.isLoading = false;
            });
        },
        applyFilters() {
            this.filteredMangas = this.mangas.filter(manga => {
                return (
                    (this.filterQuery === '' || manga.title.includes(this.filterQuery)) &&
                    (this.selectedAuthor === '' || manga.author_id === this.selectedAuthor) &&
                    (this.selectedGenre === '' || manga.genre_id === this.selectedGenre) &&
                    (this.selectedEditors === '' || manga.editor_id === this.selectedEditors)
                );
            });
            this.totalPages = Math.ceil(this.filteredMangas.length / this.mangasPerPage); // Ricalcola le pagine dopo il filtraggio
            this.currentPage = 1; // Resetta alla prima pagina dopo il filtraggio
        },
        changePage(page) {
            this.currentPage = page; // Cambia la pagina corrente
        },
        toggleWishList(manga) {
            const index = this.wishList.indexOf(manga.id);
            if (index === -1) {
                this.wishList.push(manga.id);
            } else {
                this.wishList.splice(index, 1);
            }
        }
    },
    mounted() {
        this.loadMangas(); // Carica i manga quando il componente è montato
    }
}
</script>

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