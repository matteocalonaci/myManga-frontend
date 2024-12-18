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
            <div class="row" style="background-color: rgba(0, 0, 0, 0.8);">
                <div class="col-12">

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
            <div class="row d-flex justify-content-between align-items-center" style="height: 3.5rem;">
                <div class="col-6 text-white"><b>©2024 myManga s.r.l. P.IVA: xxxxxxxxxxx</b></div>
                
                    <div class="col-6 text-end"><img src="https://pngimg.com/d/mastercard_PNG27.png" alt="" style="height: 2rem;"></div>
                

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
    width: 100%; 
    max-width: 10rem;
}

.img-container img {
    width: 100%;
    border-radius: 10rem;
}

/* Media Queries per schermi più piccoli */
@media (max-width: 768px) {
    .text-white {
        flex-direction: column; 
        align-items: center; 
    }

    .img-container {
        margin-bottom: 1rem;
    }
}
</style>