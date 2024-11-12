<script>

export default {
    name: "AppFooter",
    components: {

    },
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

                    <div class="text-white d-flex flex-row justify-content-around">
                        <div class="d-flex flex-column p-2">
                            <span>DELIVEBOO</span>
                            <router-link to="/about">Chi siamo</router-link>
                            <router-link to="/home">Ristoranti</router-link>
                        </div>

                        <div class="d-flex flex-column p-2">
                            <span>NOTE LEGALI</span>
                            <router-link to="/terms">Termini e condizioni</router-link>
                            <router-link to="/privacy">informativa sulla privacy</router-link>
                            <router-link to="/cookies">Cookies</router-link>
                        </div>

                        <div class="d-flex flex-column p-2">
                            <span>HELP</span>
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
footer {}

a {
    color: white;
    text-decoration: none;
    transition: font-size 0.2s;
}

a:hover {
    opacity: 0.5;
}

i {
    color: white;
    font-size: 2rem;
    padding: 1rem;
}
</style>