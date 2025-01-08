<template>
    <div>
        <LoadingScreen v-if="isLoading" />
        <div v-if="!isLoading">
            <div class="container" style="background-color: rgb(250, 0, 83);" ref="generalContainer">
                <div class="row mt-5">
                    <div class="col-12">
                        <div class="search-filters d-flex justify-content-center">
    <input type="text" v-model="filterQuery" placeholder="Cerca per titolo..." @input="applyFilters" />
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
                            <div v-if="filteredMangas.length === 0" class="empty-card-container">
                                <p class="text"><b>NESSUN RISULTATO TROVATO</b></p>
                                <div class="img-container">
                                    <img src="../assets/img/sad-kana.webp" alt="">
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
            <div class="pagination" v-if="totalPages > 1">
                <div class="controller-buttons">
                    <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1" class="prev-button">
                        <span class="mobile-only">&lt;</span>
                        <span class="desktop-only">Precedente</span>
                    </button>

                    <button v-if="currentPage > 3" @click="changePage(1)">1</button>
                    <span v-if="currentPage > 4">...</span>

                    <button v-if="currentPage > 2" @click="changePage(currentPage - 1)">{{ currentPage - 1 }}</button>
                    <button class="active">{{ currentPage }}</button>
                    <button v-if="currentPage < totalPages - 1" @click="changePage(currentPage + 1)">{{ currentPage + 1
                        }}</button>

                    <span v-if="currentPage < totalPages - 3">...</span>
                    <button v-if="currentPage < totalPages - 1" @click="changePage(totalPages)">{{ totalPages
                        }}</button>

                    <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages"
                        class="next-button">
                        <span class="mobile-only">&gt;</span>
                        <span class="desktop-only">Successivo</span>
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
                    console.log(response.data); // Controlla la risposta
                    this.mangas = response.data.mangas.data;
                    this.filteredMangas = this.mangas;
                    this.totalPages = Math.ceil(this.filteredMangas.length / this.mangasPerPage);

                    // Assegna i dati per autori, generi, categorie ed editori
                    this.authors = response.data.authors;
                    this.genres = response.data.genres;
                    this.editors = response.data.editors;

                    this.isLoading = false;
                })
                .catch(error => {
                    console.error("Errore nel caricamento dei manga:", error);
                    this.isLoading = false;
                });
        },
        applyFilters() {
            this.filteredMangas = this.mangas.filter(manga => {
                const genreMatch = this.selectedGenre === '' || manga.genres.some(genre => genre.id === this.selectedGenre);
                const titleMatch = this.filterQuery === '' || manga.title.toLowerCase().includes(this.filterQuery.toLowerCase());
                const authorMatch = this.selectedAuthor === '' || manga.author_id === this.selectedAuthor;
                const editorMatch = this.selectedEditors === '' || manga.editor_id === this.selectedEditors;

                const isMatch = titleMatch && authorMatch && genreMatch && editorMatch;

                // Log per il debug
                console.log(`Manga: ${manga.title}, Match: ${isMatch}`);
                return isMatch;
            });
            this.totalPages = Math.ceil(this.filteredMangas.length / this.mangasPerPage);
            this.currentPage = 1; // Resetta alla prima pagina dopo il filtraggio
        },
        changePage(page) {
            const container = document.querySelector('.general-container');
            container.scrollTop = 20; // Imposta scrollTop a 20 per testare lo scrolling     
            console.log('Change Page Called'); // Debugging
            this.currentPage = page; // Cambia la pagina corrente
            console.log('Current Page:', this.currentPage);
        },
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
    min-width: 5rem;
    gap: 1rem;
}

.card-wrapper {
    width: calc((100% / 4) - 1rem);
    min-width: 16rem;
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
    padding: 0.5rem 1rem;
    margin: 0 0.2rem;
    cursor: pointer;
    border-radius: 0.5rem;
    transition: background-color 0.3s;
}

.controller-buttons button:hover {
    background-color: rgb(250, 0, 83);
    color: white;
}

.controller-buttons button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}

.controller-buttons .active {
    background-color: rgb(250, 0, 83);
    color: white;
}

.empty-card-container {
    margin: 2rem;
    text-align: center;
}

.img-container {
    width: 100%;
    height: auto;
    object-fit: cover;
    transition: transform 0.3s;
}

img {
    width: 100%;
}

.text {
    height: 100%;
    padding: 0 0.5rem;
    color: rgba(0, 0, 0, 0.544);
    font-size: 2rem;
}

.mobile-only {
    display: none;
}

.desktop-only {
    display: inline;
}

@media (max-width: 768px) {
    .card-wrapper {
        width: calc((100% / 2) - 1rem);
    }

    .pagination {
        padding: 1rem;
    }
}

@media (max-width: 576px) {
    .search-filters input,
    .search-filters select {
        width: 100%; 
    }

    .card-wrapper {
        width: 100%;
    }

    .empty-card-container {
        margin: 2rem;
    }

    .mobile-only {
        display: none;
    }

    .desktop-only {
        display: inline;
    }

    .text {
        height: 100%;
        padding: 0 0.5rem;
        color: rgba(0, 0, 0, 0.544);
        font-size: 1.5rem;
    }

    .controller-buttons button {
        border: none;
        background-color: white;
        padding: 0.5rem 1rem; 
        margin: 0 0.2rem;
        cursor: pointer;
        border-radius: 0.5rem;
        transition: background-color 0.3s;
    }
}
</style>