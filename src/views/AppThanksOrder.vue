<script>


export default {
    name: "AppThanksOrder",
    components: {

    },
    data() {
        return {

        }

    }
}

</script>

<template>

    <div class="container">
        <div class="loading-spinner">
            <div class="spinner"></div>
        </div>
        <h1 id="order-message" style="display: none;">Ordine Effettuato!</h1>
    </div>


</template>

<style scoped>
h1 {
    padding: 3rem 0;
    text-align: center;
}

body {
    font-family: Arial, sans-serif;
    text-align: center;
}

.container {
    width: 80%;
    margin: 40px auto;
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
    border-top: 10px solid #333;
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

#order-message {
    font-size: 36px;
    font-weight: bold;
    color: #fe1c1ccc;
    animation: fade-in 1s ease-in-out;
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