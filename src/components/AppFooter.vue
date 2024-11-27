<script>
export default {
    name: "AppFooter",
    components: {},
}
</script>

<template>
    <footer>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
            integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg=="
            crossorigin="anonymous" referrerpolicy="no-referrer" />

        <div class="container-fluid">
            <div class="row">
                <div class="col-12 bg-dark">

                    <div class="text-white d-flex flex-column flex-md-row justify-content-around p-4">
                        <div class="d-flex flex-column p-2 text-center">
                            <span>MYMANGA</span>
                            <hr>
                            <div class="img-container">
                                <img src="../assets/img/kana_logo.jpeg" alt="">
                            </div>
                        </div>

                        <div class="d-flex flex-column p-2 text-center">
                            <span>PRODOTTI</span>
                            <hr>
                            <router-link to="/about">Chi siamo</router-link>
                            <router-link to="/manga">Manga</router-link>
                        </div>

                        <div class="d-flex flex-column p-2 text-center">
                            <span>NOTE LEGALI</span>
                            <hr>
                            <router-link to="/terms">Termini e condizioni</router-link>
                            <router-link to="/privacy">Informativa sulla privacy</router-link>
                            <router-link to="/cookies">Cookies</router-link>
                        </div>

                        <div class="d-flex flex-column p-2 text-center">
                            <span>HELP</span>
                            <hr>
                            <router-link to="/FAQ">FAQ</router-link>
                            <router-link to="/contact">Contact</router-link>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </footer>
</template>

<style scoped>
a {
    color: white;
    text-decoration: none;
    transition: font-size 0.2s;
}

a:hover {
    opacity: 0.5;
}

.img-container {
    width: 100%; /* Cambiato da 10rem a 100% per essere responsivo */
    max-width: 10rem; /* Imposta una larghezza massima */
}

.img-container img {
    width: 100%;
    border-radius: 10rem;
}

/* Media Queries per schermi più piccoli */
@media (max-width: 768px) {
    .text-white {
        flex-direction: column; /* Modifica la direzione su schermi piccoli */
        align-items: center; /* Centra gli elementi */
    }

    .img-container {
        margin-bottom: 1rem; /* Spazio tra l'immagine e il testo */
    }
}
</style>