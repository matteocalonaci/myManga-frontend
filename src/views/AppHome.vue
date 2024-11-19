<script>
import MangaList from '../components/MangaList.vue';
export default {
    components: {
        MangaList,
    },
    data() {
        return {
            images: [
                {
                    src: 'https://via.placeholder.com/800x400?text=Immagine+1',
                    alt: 'Immagine 1',
                    title: 'Titolo 1',
                    description: 'Descrizione dell\'immagine 1'
                },
                {
                    src: 'https://via.placeholder.com/800x400?text=Immagine+2',
                    alt: 'Immagine 2',
                    title: 'Titolo 2',
                    description: 'Descrizione dell\'immagine 2'
                },
                {
                    src: 'https://via.placeholder.com/800x400?text=Immagine+3',
                    alt: 'Immagine 3',
                    title: 'Titolo 3',
                    description: 'Descrizione dell\'immagine 3'
                }
            ]
        };
    }
};
</script>

<template>
    <div id="carouselExample" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">
            <div class="carousel-item" v-for="(image, index) in images" :key="index" :class="{ active: index === 0 }">
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
                        <img src="https://mangayo.it/41589-large_default/oshi-no-ko-15-my-star.jpg" alt="">
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
                        <img src="https://mangayo.it/41156-large_default/hirayasumi-7.jpg" alt="">
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
                        <img src="https://mangayo.it/40607-large_default/blue-lock-26.jpg" alt="">
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
                        <img src="https://mangayo.it/40585-large_default/heavenly-delusion-10.jpg" alt="">
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
</template>


<style scoped>
.carousel-item img {
    height: 400px;
    /* Imposta l'altezza desiderata per le immagini */
}

.card-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 1rem;
    padding: 2rem;
}



.img-container {
    height: 30rem;
    overflow: hidden;

    img {
        width: 100%;
    }
}

.card {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    width: calc((100% / 4) - 1rem);
    margin-bottom: 2rem;

}

.fa-heart {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    font-size: 1.5rem;
    transition: color 0.3s ease;
}
</style>