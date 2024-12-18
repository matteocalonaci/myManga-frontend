<script>
export default {
    name: "AppThanksOrder",
    data() {
        return {};
    },
    mounted() {
        setTimeout(() => {
            this.$router.push({ name: 'AppHome' });
        }, 5000);
    }
}
</script>

<template>
    <div class="container d-flex flex-column justify-content-center align-items-center">
        <div class="col-12 col-md-8">
            <h1 id="order-message">Ordine Effettuato!</h1>
            <p>Grazie per il tuo acquisto. Riceverai un'email di conferma a breve.</p>
        </div>
        <div class="col-12 col-md-4">
            <img src="../assets/img/kana-payment-ok.gif" alt="Pagamento riuscito" class="success-image">
        </div>
        <div class="loading-spinner">
            <div class="spinner"></div>
        </div>
    </div>
</template>

<style scoped>
body {
    font-family: 'Arial', sans-serif;
    background-color: #f9f9f9; 
    color: #333; 
    text-align: center;
    height: 100%;
}

.container {
    width: 80%;
    max-width: 400px; 
    margin: 20px auto;
    padding: 1rem;
    background-color: #fff; 
    border-radius: 8px; 
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); 
}

h1 {
    padding: 1rem 0;
    font-size: 1.5rem; 
    color: #28a745;
    animation: fade-in 1s ease-in-out;
}

.success-image {
    width: 100%; 
    max-width: 10rem; 
    height: auto; 
    margin-top: 1rem; 
}

.loading-spinner {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 4rem; 
    margin-top: 1rem; 
}

.spinner {
    width: 2rem; 
    height: 2rem; 
    border: 0.4rem solid #ccc; 
    border-top: 0.4rem solid #28a745; 
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
    font-size: 0.9rem; 
    margin: 0.5rem 0; 
}

@keyframes fade-in {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}

@media (max-width: 768px) {
    h1 {
        font-size: 1.5rem; 
    }

    p {
        font-size: 0.8rem;
    }

    .success-image {
        max-width: 100%; 
    }
}
</style>