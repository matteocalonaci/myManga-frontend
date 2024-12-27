<script>
export default {
    name: "AppFooter",
    data() {
        return {
            isOpen: {
                prodotti: false,
                noteLegali: false,
                help: false
            },
            isDesktop: window.innerWidth > 768
        };
    },
    methods: {
        toggleText(section) {
            this.isOpen[section] = !this.isOpen[section];
        },
        checkWindowSize() {
            this.isDesktop = window.innerWidth > 768;
        }
    },
    mounted() {
        window.addEventListener('resize', this.checkWindowSize);
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.checkWindowSize);
    }
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
                        <div class="d-flex flex-column pl-2 text-center">
                            <h3>MYMANGA</h3>
                            <hr>
                            <div class="img-container">
                                <img src="../assets/img/kana_logo.jpeg" alt="">
                            </div>
                        </div>

                        <div class="footer-link">
                            <div class="mb-5 d-flex">
                                <div class="col-11">
                                    <h6 class="faq-text mb">PRODOTTI</h6>
                                    <div class="toggle-content" v-show="isOpen.prodotti || isDesktop">
                                        <!-- Mostra solo se aperto o in desktop -->
                                        <hr />
                                        <div class="row d-flex flex-column" style="min-width: 5rem;">
                                            <router-link to="/about">Chi siamo</router-link>
                                            <router-link to="/manga">Manga</router-link>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-1">
                                    <span class="toggle-button" @click="toggleText('prodotti')"
                                        style="font-size: 1.5rem">{{ isOpen.prodotti ? '-' : '+' }}</span>
                                </div>
                            </div>

                            <div class="mb-5 d-flex">
                                <div class="col-11">
                                    <h6 class="faq-text mb">NOTE LEGALI</h6>
                                    <div class="toggle-content" v-show="isOpen.noteLegali || isDesktop">
                                        <!-- Mostra solo se aperto o in desktop -->
                                        <hr />
                                        <div class="row d-flex flex-column" style="min-width: 5rem;">
                                            <router-link to="/terms">Termini e condizioni</router-link>
                                            <router-link to="/privacy">Informativa sulla privacy</router-link>
                                            <router-link to="/cookies">Cookies</router-link>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-1">
                                    <span class="toggle-button" @click="toggleText('noteLegali')"
                                        style="font-size: 1.5rem">{{ isOpen.noteLegali ? '-' : '+' }}</span>
                                </div>
                            </div>

                            <div class="mb-5 d-flex">
                                <div class="col-11">
                                    <h6 class="faq-text mb">HELP</h6>
                                    <div class="toggle-content" v-show="isOpen.help || isDesktop">
                                        <!-- Mostra solo se aperto o in desktop -->
                                        <hr />
                                        <div class="row d-flex flex-column" style="min-width: 5rem;">
                                            <router-link to="/FAQ">FAQ</router-link>
                                            <router-link to="/contact">Contact</router-link>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-1">
                                    <span class="toggle-button" @click="toggleText('help')" style="font-size: 1.5rem">{{
                                        isOpen.help ? '-' : '+' }}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div class="row d-flex justify-content-between align-items-center" style="height: 3.5rem;">
                <div class="col-6" style="color: rgba(0, 0, 0, 0.6);"><b>©2024 myManga s.r.l. P.IVA: xxxxxxxxxxx</b>
                </div>

                <div class="col-6 text-end"><img src="https://pngimg.com/d/mastercard_PNG27.png" alt=""
                        style="height: 2rem;"></div>
            </div>
        </div>
    </footer>
</template>

<style scoped>
a {
    color: rgba(255, 255, 255, 0.605);
    text-decoration: none;
    transition: font-size 0.2s;
}

.footer-link {
    width: 60%;
    display: flex;
    justify-content: space-between;
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

.mb-5 {
    margin-bottom: 1.5rem;
}

.faq-text {
    cursor: pointer;
}

.toggle-content {
    display: flex;
    flex-direction: column;
}

.toggle-button {
    cursor: pointer;
    font-size: 1.5rem;
    display: none;
    /* Nascondi il pulsante in desktop */
}

@media (max-width: 768px) {
    .text-white {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
    }

    .img-container {
        margin-bottom: 1rem;
        width: 100%;
        max-width: 10rem;
    }

    .faq-text {
        margin: 0;
    }

    .toggle-button {
        display: block;
        /* Mostra il pulsante in mobile */
    }

    .footer-link {
        margin-top: 3rem;
        display: flex;
        justify-content: center;
        flex-direction: column;
    }

    .mb-5 {
        justify-content: center;
        align-items: center;
    }

    .toggle-content {
        display: block;
        text-align: center;
    }
}
</style>