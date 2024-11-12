<!-- JS -->
<script>
export default {
    name: "AppContact",
    data() {
        return {
            // base_url: 'http://localhost:8000',
            name: '',
            email: '',
            message: '',
            errors: {},
            success: false
        }
    },
    methods: {
        sendMessage() {

            //preparare la richiesta
            const data =
            {
                name: this.name,
                email: this.email,
                message: this.message
            }
            console.log(data);
        }

    }

}
</script>


<!-- HTML -->
<template>
    <div class="card">
        <div class="col-6 p-4">
            <h2>Contattaci</h2>
            <p>Se hai domande, suggerimenti o semplicemente vuoi parlare di manga, non esitare a contattarci! Siamo sempre felici di ricevere feedback e di connetterci con altri appassionati.

Grazie per aver scelto myManga. Speriamo che la nostra app ti aiuti a scoprire e apprezzare ancora di più il fantastico mondo dei manga!
            </p>
            <template v-if="success">
                <div class="alert alert-success" role="alert">
                    <b>Messaggio inviato</b>
                </div>
            </template>

        </div>

        <div class="col-6 p-4">
            <form @submit.prevent="sendMessage()">
                <div class="mb-3">
                    <label for="name" class="form-label">Name</label>
                    <input type="text" class="form-control" :class="{ 'is-invalid': errors.name }" name="name" id="name"
                        aria-describedby="helpId" placeholder="" v-model="name">

                    <p class="text-danger" v-for="(error, index) in errors.name" :key="`name-error-${index}`">
                        {{ error }}
                    </p>

                    <small id="nameHelper" class="form-text text-muted">Write your name</small>
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label">Email</label>
                    <input type="text" class="form-control" :class="{ 'is-invalid': errors.email }" name="email"
                        id="email" aria-describedby="emailHelp" placeholder="" v-model="email">

                    <p class="text-danger" v-for="(error, index) in errors.email" :key="`email-error-${index}`">
                        {{ error }}
                    </p>



                    <small id="emailHelper" class="form-text text-muted">Write your email</small>
                </div>
                <div class="mb-3">
                    <label for="message" class="form-label">Message</label>
                    <textarea type="text" class="form-control" :class="{ 'is-invalid': errors.message }" name="message"
                        id="message" rows="3" placeholder="" v-model="message">
            </textarea>

                    <p class="text-danger" v-for="(error, index) in errors.message" :key="`message-error-${index}`">
                        {{ error }}
                    </p>

                    <small id="messageHelper" class="form-text text-muted">Write your email text</small>
                </div>
                <button type="submit" class="btn btn-primary">
                    SEND
                </button>
            </form>
        </div>

    </div>


</template>


<!-- CSS -->
<style scoped>
.card {
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

button {
    border-radius: 8px;
    border: 1px solid transparent;
    padding: 0.6em 1.2em;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    background-color: #1a1a1a;
    cursor: pointer;
    transition: border-color 0.25s;
}

button:hover {
    border-color: #646cff;
}

button:focus,
button:focus-visible {
    outline: 4px auto -webkit-focus-ring-color;
}
</style>
