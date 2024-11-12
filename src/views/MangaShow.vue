<script>
//APP MANGA SARA' IL SINGOLO MANGA CON CARRELLO A FIANCO

import axios from 'axios';
import Single_Manga from '../components/Single_Manga.vue';
import Cart from '../components/Cart.vue';

export default {
    name: 'MangaShow',
    components: {
        Single_Manga,
        Cart

    },
    data() {
        return {
            base_url: 'http://localhost:8000/',
        }
    },
    // ...
    methods: {


    },
    mounted() {
         
    },
    computed: {
       
    },
}
</script>

<template>

</template>
<style scoped>

</style>