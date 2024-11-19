        <script>
        import axios from 'axios';
        import LoadingScreen from '../components/LoadingScreen.vue';
        import Cart from '../components/Cart.vue'; 
        import { store } from '../store'; 
        
        export default {
            name: 'MangaShow',
            components: {
                LoadingScreen,
                Cart,
            },
            data() {
                return {
                    base_url: 'http://localhost:8000/',
                    manga: null,
                    loading: true,
                    isLiked: false,
                    quantity: 1,
                };
            },
            mounted() {
                this.getManga();
            },
            methods: {
                getManga() {
                    const slug = this.$route.params.slug;
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
                increaseQuantity() {
                    this.quantity++;
                },
                decreaseQuantity() {
                    if (this.quantity > 1) {
                        this.quantity--;
                    }
                },
                addToCart() {
                    const mangaWithQuantity = { ...this.manga, quantity: this.quantity };
                    store.addToCart(mangaWithQuantity);
                    console.log(`Aggiunto ${this.quantity} di ${this.manga.title} al carrello.`);
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
        <div class="container p-5">
            <div class="row">
                <div class="col-12 col-md-4 mb-4">
                    <div class="img-container">
                        <img :src="manga.cover_image" class="card-img-top img-fluid" alt=""
                            style="object-fit: cover; border-radius: 1rem;">
                        <i :class="['fa-heart text-danger', isLiked ? 'fa-solid' : 'fa-regular']"
                            @click.stop="toggleLike" :style="iconStyle" style="cursor: pointer;"></i>
                    </div>
                </div>
                <div class="col-12 col-md-8">
                    <div class="card-body">
                        <h2 class="card-title"><b>{{ manga.title }}</b></h2>
                        <h5 class="card-text mt-3 mb-4"><b>€{{ manga.price }}</b></h5>
                        <p class="card-text">
                            <span class="th">Generi:</span>
                            <span class="genres-container d-flex flex-wrap">
                                <span class="genre" v-for="genre in manga.genres" :key="genre.id">{{ genre.name }}</span>
                            </span>
                        </p>
                        <p class="card-text"><span class="th">Autore:</span> {{ manga.authors.name }}</p>
                        <p class="card-text"><span class="th">Volume:</span> {{ manga.volume }}</p>
                        <p class="card-text"><span class="th">Disponibilità:</span> {{ manga.availability ? 'Disponibile' : 'Non disponibile' }}</p>
                        <p class="card-text"><span class="th">In corso? </span> {{ manga.in_progress ? 'Sì' : 'No' }}</p>
                        <p class="card-text"><span class="th">Anno: </span>{{ manga.year }}</p>
                        <p class="card-text"><span class="th">Categoria: </span> {{ manga.categories.name }}</p>
                        <p class="card-text"><span class="th">Editore: </span> {{ manga.editors.name }}</p>

                        <div class="d-flex flex-column flex-md-row justify-content-center align-items-center mt-3">
                            <button class="addToCart flex-grow-1" @click="addToCart">Aggiungi al carrello <i class="fa-solid fa-cart-shopping"></i></button>
                        </div>
                        <Cart />
                    </div>
                </div>
            </div>

            <div class="description-container mt-4">
                <p class="card-text"><span class="th">Descrizione:</span></p>
                <hr>
                <p class="card-text">{{ manga.description }}</p>
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

.card-body {
    background-color: white;
    padding: 1rem;
    border-radius: 1rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.377);
}

.th {
    color: rgb(250, 0, 83);
    font-weight: bold;
}

.description-container {
    padding: 1rem;
    border-radius: 2rem;
    background-color: white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.377);
}

.img-container {
    max-height: 32.5rem;
    border-radius: 1rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.377);
}

.quantiy-btn {
    padding: 1rem 2rem;
    border-radius: 2rem;
    color: rgb(250, 0, 83);
    border: 0.1rem solid rgb(250, 0, 83);
}

.quantity {
    padding: 0 3rem;
}

.pulsanti {
    border: none;
    color: rgb(250, 0, 83);
    background-color: white;
 font-size: 1rem;
}

.quantiy-btn:hover {
    background-color: black;
    color: white;
    border: 0.1rem solid black;
}

.quantiy-btn:hover .pulsanti {
    color: white;
    background-color: black;
}

.addToCart {
    padding: 1rem 2rem;
    background-color: rgb(250, 0, 83);
    border-radius: 2rem;
    border: none;
    color: white;
}

.addToCart:hover {
    color: white;
    background-color: black;
}
</style>