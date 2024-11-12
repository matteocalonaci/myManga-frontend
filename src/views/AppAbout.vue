<!-- JS -->
<script>
export default {
    name: "AppAbout",
    data() {
        return {

        }

    }

}
</script>


<!-- HTML -->
<template>
    <div class="card">
        <col-6 class="p-4">
            <h5>About us</h5>
            <p>
                ## Chi Siamo

                Benvenuti su **myManga**, la tua destinazione ideale per esplorare il meraviglioso mondo dei manga!
                Siamo un team di appassionati di manga e sviluppatori che hanno unito le forze per creare
                un'applicazione che renda la scoperta e la gestione dei manga un'esperienza semplice e coinvolgente.

                ### La Nostra Missione

                La nostra missione è fornire un'interfaccia intuitiva e user-friendly che permetta agli utenti di
                scoprire nuovi manga, tenere traccia delle proprie letture e connettersi con altri appassionati.
                Crediamo che i manga siano una forma d'arte unica e vogliamo rendere più facile per tutti accedere a
                questa straordinaria cultura.

                ### Cosa Facciamo

                - **Esplorazione dei Manga**: Offriamo una piattaforma dove gli utenti possono cercare e scoprire una
                vasta gamma di manga, dai classici ai più recenti.
                - **Gestione delle Letture**: Gli utenti possono tenere traccia dei manga che stanno leggendo e
                aggiungere i loro preferiti a una lista personale.
                - **Comunità di Appassionati**: Vogliamo creare una comunità dove gli amanti dei manga possano
                condividere le loro opinioni, raccomandazioni e passioni.

                ### Il Nostro Team
                Siamo un gruppo eterogeneo di sviluppatori, designer e appassionati di manga provenienti da diverse
                parti del mondo. Ognuno di noi porta una prospettiva unica e una passione per il mondo dei manga, e
                insieme lavoriamo per rendere myManga un'applicazione che soddisfi le esigenze dei nostri utenti.

            </p>
        </col-6>
        <col-6 class="d-flex justify-content-center align-items-center m-0 p-4">
            <div class="card-img">
                <img src="https://as2.ftcdn.net/v2/jpg/03/16/12/51/1000_F_316125188_FYs3RbaUQ6gGwom3sfqSvgt2QGw3fKol.jpg"
                    alt="">
            </div>
        </col-6>
    </div>

</template>


<!-- CSS -->
<style scoped>
.card {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 5rem;
}

.card-img {
    width: 20rem;
    height: 20rem;
    object-fit: cover;
}

img {
    border-radius: 100%;
    width: 100%;

}
</style>
