<script>
import AppFooter from '../components/AppFooter.vue';
import MangaList from '../components/MangaList.vue';
import Cart from '../components/Cart.vue';

export default {
    name: 'App',
    components: {
        MangaList,
        AppFooter,
        Cart 
    },
    data() {
        return {
            images: [
                {
                    src: 'https://mangayo.it/modules/an_homeslider/img/2de68a19ec2b1a3a03ba81f6530c03c7_1.jpg',
                    alt: 'Immagine 1',
                    // title: 'Titolo 1',
                    // description: 'Descrizione dell\'immagine 1'
                },
                {
                    src: 'https://mangayo.it/modules/an_homeslider/img/dd015f45b8f3eff56284d734d60f0590_1.png',
                    alt: 'Immagine 2',
                    // title: 'Titolo 2',
                    // description: 'Descrizione dell\'immagine 2'
                },
                {
                    src: 'https://mangayo.it/modules/an_homeslider/img/9b33aebf678865b1ef6e24b397e1c990_1.png',
                    alt: 'Immagine 3',
                    // title: 'Titolo 3',
                    // description: 'Descrizione dell\'immagine 3'
                }
            ]
        };
    },
    methods: {
      openCart() {
        const offcanvasElement = document.getElementById('cartOffcanvas');
        const offcanvas = new bootstrap.Offcanvas(offcanvasElement);
        offcanvas.show();
      }
    }

};
</script>

<template>
      <div>
      <AppHeader @open-cart="openCart" />
      
    <div id="carouselExample" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">
        <div class="carousel-item pt-5" v-for="(image, index) in images" :key="index" :class="{ active: index === 0 }">
            <img :src="image.src" class="d-block w-100" :alt="image.alt">
            <div class="carousel-caption d-none d-md-block">
                <h5>{{ image.title }}</h5>
                <p>{{ image.description }}</p>
            </div>
        </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
    </button>
        <div class="text-center p-5">
            <h2>Novità</h2>
        </div>
        <!-- <MangaList :mangas="mangas" /> -->
        <div class="card-container">

                <!-- OSHI NO KO 15 -->
                <div class="card" :style="{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)' }">
                    <div class="img-container" :style="{ borderRadius: '10px 10px 0 0' }">

                        <router-link :to="{ name: 'MangaShow', params: { slug: 'oshi-no-ko-15-my-star' } }">

                        <img src="https://mangayo.it/41589-large_default/oshi-no-ko-15-my-star.jpg" alt="">
                        </router-link>
                    </div>
                    <div class="card-body">
                        <h6 class="card-title pb-2 text-center"> Oshi no ko 15 - My Star</h6>
                        <div class="row">
                            <div class="col-12 text-center">
                                <p class="card-text"><b>€ 6.50</b></p>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- HIRAUASUMI 7 -->
                <div class="card" :style="{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)' }">
                    <div class="img-container" :style="{ borderRadius: '10px 10px 0 0' }">
                        <router-link :to="{ name: 'MangaShow', params: { slug: 'hirayasumi-7' } }">
                            <img src="https://mangayo.it/41156-large_default/hirayasumi-7.jpg" alt="">
                            </router-link>
                    </div>
                    <div class="card-body">
                        <h6 class="card-title pb-2 text-center"> Hirayasumi 7</h6>
                        <div class="row">
                            <div class="col-12 text-center">
                                <p class="card-text"><b>€ 7.50</b></p>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- BLUE LOCK 26 -->
                <div class="card" :style="{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)' }">
                    <div class="img-container" :style="{ borderRadius: '10px 10px 0 0' }">
                     
                        <router-link :to="{ name: 'MangaShow', params: { slug: 'blue-lock-26' } }">
                            <img src="https://mangayo.it/40607-large_default/blue-lock-26.jpg" alt="">
                            </router-link>  
                    </div>
                    <div class="card-body">
                        <h6 class="card-title pb-2 text-center"> Blue Lock 26</h6>
                        <div class="row">
                            <div class="col-12 text-center">
                                <p class="card-text"><b>€ 7.00</b></p>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- HEAVENLY DELUSION 10 -->
                <div class="card" :style="{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)' }">
                    <div class="img-container" :style="{ borderRadius: '10px 10px 0 0' }">
                        <router-link :to="{ name: 'MangaShow', params: { slug: 'heavenly-delusion-10' } }">
                        <img src="https://mangayo.it/40585-large_default/heavenly-delusion-10.jpg" alt="">
                        </router-link>
                    </div>
                    <div class="card-body">
                        <h6 class="card-title pb-2 text-center"> Heavenly Delusion 10</h6>
                        <div class="row">
                            <div class="col-12 text-center">
                                <p class="card-text"><b>€ 7.50</b></p>
                            </div>
                        </div>
                    </div>
                </div>
        </div>


    </div>

     <!-- Offcanvas per il carrello -->
     <Cart /> 
     <AppFooter />


</div>
</template>


<style scoped>
.carousel-item {
    transition: transform 0.35s ease-in-out; 
}

.carousel-item img {
    width: 100%;
    height: auto;
}

.card-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 1rem;
    padding: 2rem;
}



.img-container {
    height: auto;
    overflow: hidden;

    img {
        width: 100%;
    }
}

.card {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    width: calc((100% / 4) - 1rem);
    height: auto;
    margin-bottom: 2rem;
}

.fa-heart {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    font-size: 1.5rem;
    transition: color 0.3s ease;
}

.card-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 1rem;
    padding: 2rem;
}


/* Media Queries per schermi più piccoli */
@media (max-width: 768px) {
 
    .carousel-item img {
        height: 33vh; /* Imposta un'altezza maggiore per le immagini su schermi medi */
    }
    
}

@media (max-width: 576px) {
    .card {
        flex: 1 1 calc(50% - 1rem); /* 2 card per riga su schermi medi */
    }
    .carousel-item img {
        height: 30vh; /* Imposta un'altezza maggiore per le immagini su schermi medi */
    }
}
</style>