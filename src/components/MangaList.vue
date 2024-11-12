            
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
    <div v-if="mangas.length > 0">
        <div class="container" style="background-color:  rgb(250, 0, 83);">
            <hr>
            <div class="row mt-5">
                <div class="col-md-12">
                    <!-- manga list -->
                    <div class="card-container">
                        <div v-for="manga in mangas" :key="manga.id" class="card-wrapper">
                            <Single_Manga :manga="manga" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <LoadingScreen v-if="loading" />
</template>

<style scoped>
.card-container {
    display: flex;
    flex-wrap: wrap; /* Permette alle card di andare a capo se non c'è spazio */
    justify-content: space-between; /* Spazio uniforme tra le card */
    gap: 1rem; /* Spazio di 1rem tra le card */
}

.card-wrapper {
    width: calc((100% / 5) - 1rem); /* Calcola la larghezza per 5 card per fila, sottraendo lo spazio */
    margin-bottom: 2rem; /* Spazio tra le righe di card */
}
</style>