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
        this.getMangas(); // Questo ora include anche i filtri
        this.getWishList();
    },
    methods: {
        getMangas(page = 1, perPage = 12) {
    this.loading = true;
    const url = `${this.base_url}api/mangas?page=${page}&per_page=${perPage}`;
    axios.get(url)
        .then(response => {
            console.log("Risposta API:", response.data);
            this.mangas = response.data.mangas.data; // I dati della pagina corrente
            this.totalPages = response.data.mangas.last_page; // Ultima pagina
            this.currentPage = response.data.mangas.current_page; // Pagina corrente
            
            // Recupera anche autori, generi, categorie ed editori
            this.authors = response.data.authors;
            this.genres = response.data.genres;
            this.categories = response.data.categories;
            this.editors = response.data.editors;

            this.applyFilters(); // Applica i filtri dopo aver caricato i dati
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
        prevPage() {
    if (this.currentPage > 1) {
        this.currentPage--;
        this.getMangas(this.currentPage); // Passa la pagina corrente
    }
},

nextPage() {
    if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.getMangas(this.currentPage); // Passa la pagina corrente
    }
},
applyFilters() {
    console.log("Dati manga originali:", this.mangas);
    console.log("Filtro query:", this.filterQuery);
    console.log("Autore selezionato:", this.selectedAuthor);
    console.log("Genere selezionato:", this.selectedGenre);
    console.log("Categoria selezionato:", this.selectedCategory);
    console.log("Editore selezionato:", this.selectedEditors);

    this.filteredMangas = this.mangas.filter(manga => {
        const matchesQuery = manga.title.toLowerCase().includes(this.filterQuery.trim().toLowerCase());
        const matchesAuthor = this.selectedAuthor ? manga.author_id.toString() === this.selectedAuthor.toString() : true;
        const matchesGenre = this.selectedGenre ? manga.genre_id && manga.genre_id.includes(this.selectedGenre.toString()) : true;   
        const matchesCategory = this.selectedCategory ? manga.category_id.toString() === this.selectedCategory.toString() : true;     
        const matchesEditors = this.selectedEditors ? manga.editor_id.toString() === this.selectedEditors.toString() : true;

        return matchesQuery && matchesAuthor && matchesGenre && matchesCategory && matchesEditors;
    });

    console.log("Manga filtrati:", this.filteredMangas);

    this.totalPages = Math.ceil(this.filteredMangas.length / 12);
    this.currentPage = 1; // Resetta la pagina corrente se i risultati cambiano
}
    },
    computed: {
        currentWishList() {
            return this.wishList;
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
                    <div class="search-filters d-flex justify-content-center">
                        <input type="text" v-model="filterQuery" placeholder="Cerca per titolo..."
                            @input="applyFilters" />
                        <select v-model="selectedAuthor" @change="applyFilters">
                            <option value="">Seleziona Autore</option>
                            <option v-for="author in authors" :key="author.id" :value="author.id">{{ author.name }}
                            </option>
                        </select>
                        <select v-model="selectedGenre" @change="applyFilters">
                            <option value="">Seleziona Genere</option>
                            <option v-for="genre in genres" :key="genre.id" :value="genre.id">{{ genre.name }}</option>
                        </select>
                        <select v-model="selectedCategory" @change="applyFilters">
                            <option value="">Seleziona Categoria</option>
                            <option v-for="category in categories" :key="category.id" :value="category.id">{{
                                category.name }}</option>
                        </select>
                        <select v-model="selectedEditors" @change="applyFilters">
                            <option value="">Seleziona Editore</option>
                            <option v-for="editor in editors" :key="editor.id" :value="editor.id">{{ editor.name }}
                            </option>
                        </select>
                    </div>
                    <div class="card-container d-flex justify-content-center align-items-center">
                        <div v-if="filteredMangas.length === 0" class="">
                            <div
                                class="empty-card-container position-relative d-flex justify-content-center align-items-center">
                                <img src="../assets/img/sad-kana.webp" alt="sad-kana" style="width: 40rem;">
                                <p class="text position-absolute bottom-0"><b>NESSUN RISULTATO TROVATO</b></p>
                            </div>
                        </div>

                        <div v-for="manga in filteredMangas.slice((currentPage - 1) * 12, currentPage * 12)" :key="manga.id" class="card-wrapper">
    <Single_Manga :manga="manga" :wishList="wishList" @add-to-wishlist="toggleWishList" @remove-from-wishlist="toggleWishList" />
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

.controller-buttons button:hover {
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