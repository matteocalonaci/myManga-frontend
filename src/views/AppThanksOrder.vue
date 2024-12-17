<script>
export default {
    name: "AppThanksOrder",
    data() {
        return {};
    },
    mounted() {
        setTimeout(() => {
            this.$router.push({ name: 'AppHome' });
        }, 5000); // Reindirizza alla home dopo 5 secondi
    }
}
</script>

<template>
    <div class="loading-spinner">
        <div class="spinner"></div>
    </div>
    <div class="container d-flex justify-content-center align-items-center">
        <div class="col-7">
            <h1 id="order-message">Ordine Effettuato!</h1>
            <p>Grazie per il tuo acquisto. Riceverai un'email di conferma a breve.</p>
            <p style="font-size: 0.5rem; color: #333;">Verrai reindirizzato alla home page tra 5 secondi...</p>

        </div>
        <div class="col-4">
            <img src="../assets/img/kana-payment-ok.gif" alt="Pagamento riuscito" class="success-image">

        </div>
    </div>
</template>

<style scoped>
body {
    font-family: 'Arial', sans-serif;
    background-color: #f9f9f9; /* Colore di sfondo chiaro */
    color: #333; /* Colore del testo */
    text-align: center;
    height: 100%;
}

.container {
    width: 60%;
    max-width: 600px; /* Limita la larghezza massima */
    margin: 40px auto;
    padding: 1rem;
    background-color: #fff; /* Sfondo bianco per il contenitore */
    border-radius: 8px; /* Angoli arrotondati */
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* Ombra leggera */
}

h1 {
    padding: 1rem 0;
    font-size: 2.5rem; /* Dimensione del font più grande */
    color: #28a745; /* Verde per il messaggio di successo */
    animation: fade-in 1s ease-in-out;
}

.loading-spinner {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
}

.spinner {
    width: 50px;
    height: 50px;
    border: 10px solid #ccc;
    border-top: 10px solid #28a745; /* Verde per il caricamento */
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

p {
    font-size: 1.1rem; /* Dimensione del font per i paragrafi */
    margin: 10px 0; /* Margine verticale */
}

.success-image {
    width: 100%; /* Immagine responsiva */
    max-width: 300px; /* Limita la larghezza massima */
    margin-top: 20px; /* Margine superiore */
}

@keyframes fade-in {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
</style>