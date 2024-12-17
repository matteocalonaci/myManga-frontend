<template>
  <div class="checkout-container">
    <h1>Checkout</h1>

    <div class="row">
      <div class="col-md-8">
        <div class="accordion" id="checkoutAccordion">
          <div class="card">
            <div class="card-header" id="userInfoHeading">
              <h2 class="mb-0">
                <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#userInfo"
                  aria-expanded="true" aria-controls="userInfo">
                  Informazioni Utente
                </button>
              </h2>
            </div>
            <div id="userInfo" class="collapse show" aria-labelledby="userInfoHeading" data-parent="#checkoutAccordion">
              <div class="card-body">
                <div class="form-group">
                  <input v-model="user.name" placeholder="Nome" required />
                </div>
                <div class="form-group">
                  <input v-model="user.surname" placeholder="Cognome" required />
                </div>
                <div class="form-group">
                  <input v-model="user.email" placeholder="Email" required />
                </div>
                <div class="form-group">
                  <input v-model="user.phone" placeholder="Telefono" required />
                </div>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card-header" id="shippingInfoHeading">
              <h2 class="mb-0">
                <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#shippingInfo"
                  aria-expanded="false" aria-controls="shippingInfo">
                  Informazioni di Spedizione
                </button>
              </h2>
            </div>
            <div id="shippingInfo" class="collapse" aria-labelledby="shippingInfoHeading"
              data-parent="#checkoutAccordion">
              <div class="card-body">
                <div class="form-group">
                  <input v-model="shipping.address" placeholder="Indirizzo" required />
                </div>
                <div class="form-group">
                  <input v-model="shipping.city" placeholder="Città" required />
                </div>
                <div class="form-group">
                  <input v-model="shipping.state" placeholder="Stato" required />
                </div>
                <div class="form-group">
                  <input v-model="shipping.postalCode" placeholder="Codice Postale" required />
                </div>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card-header" id="shippingMethodHeading">
              <h2 class="mb-0">
                <button class="btn btn-link collapsed" type="button" data-toggle="collapse"
                  data-target="#shippingMethod" aria-expanded="false" aria-controls="shippingMethod">
                  Metodo di Spedizione
                </button>
              </h2>
            </div>
            <div id="shippingMethod" class="collapse" aria-labelledby="shippingMethodHeading"
              data-parent="#checkoutAccordion">
              <div class="card-body">
                <div class="form-group d-flex justify-content-center align-items-center">
                  <input type="radio" id="shippingMethodCheckbox" v-model="shippingMethodSelected" value="Corriere GLS"
                    checked class="custom-checkbox" />
                  <span style="margin-right: 5rem;">Corriere GLS</span> <span style="margin-right: 5rem;">2/3 giorni
                    lavorativi</span> <span>5,50 € tasse incluse</span>
                </div>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card-header" id="paymentInfoHeading">
              <h2 class="mb-0">
                <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#paymentInfo"
                  aria-expanded="false" aria-controls="paymentInfo">
                  Informazioni di Pagamento
                </button>
              </h2>
            </div>
            <div id="paymentInfo" class="collapse" aria-labelledby="paymentInfoHeading"
              data-parent="#checkoutAccordion">
              <div class="card-body">
                <div id="dropin-container"></div>
              </div>
            </div>
          </div>
        </div>

        <button type="submit" class="submit-button" @click="submitOrder">Paga</button>
      </div>

      <div class="col-md-4">
        <div class="cart-items">
          <h2>Prodotti nel Carrello</h2>
          <ul>
            <li v-for="item in cartItems" :key="item.id">
              {{ item.title }} - €{{ (parseFloat(item.price) || 0).toFixed(2) }} x {{ item.quantity }}
            </li>
          </ul>
          <h5>Totale: €{{ cartTotal }}</h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import braintree from 'braintree-web';
import dropin from 'braintree-web-drop-in';
import { store } from '../store'; // Assicurati di avere il percorso corretto

export default {
  data() {
    return {
      cartItems: [],
      user: {
        name: '',
        surname: '',
        email: '',
        phone: ''
      },
      shipping: {
        address: '',
        city: '',
        state: '',
        postalCode: '',
      },
      shippingMethodSelected: 'Corriere GLS', // Valore di default
      dropinInstance: null,
    };
  },
  computed: {
    cartTotal() {
      return this.cartItems.reduce((sum, item) => {
        const price = parseFloat(item.price);
        return sum + (isNaN(price) ? 0 : price * item.quantity);
      }, 0).toFixed(2);
    }
  },
  mounted() {
    this.cartItems = store.cart; // Ottieni gli articoli dal carrello
    this.initializeBraintree(); // Inizializza Braintree
  },
  methods: {
    initializeBraintree() {
      fetch('http://localhost:8000/api/braintree/token')
        .then(response => response.json())
        .then(data => {
          return dropin.create({
            authorization: data.clientToken,
            container: '#dropin-container',
          });
        })
        .then(instance => {
          this.dropinInstance = instance;
        })
        .catch(err => {
          console.error('Errore nell\'inizializzazione di Braintree:', err);
        });
    },
    submitOrder() {
  this.dropinInstance.requestPaymentMethod().then(payload => {
    const orderDetails = {
      user: {
        name: this.user.name,
        surname: this.user.surname,
        email: this.user.email,
        phone: this.user.phone
      },
      shipping: {
        address: this.shipping.address,
        city: this.shipping.city,
        state: this.shipping.state,
        postalCode: this.shipping.postalCode,
      },
      shippingMethod: this.shippingMethodSelected,
      paymentMethodNonce: payload.nonce,
      amount: this.cartTotal,
      products: this.cartItems.map(item => ({
        id: item.id,
        title: item.title,
        price: parseFloat(item.price).toFixed(2),
        quantity: item.quantity
      }))
    };

    // Invia l'ordine al server
    fetch('http://localhost:8000/api/braintree/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderDetails),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data); // Mostra la risposta del server nella console
        if (data.status === 'success') {
          // Svuota il carrello
          this.cartItems = [];
          store.commit('clearCart'); // Se stai usando Vuex per gestire il carrello

          // Reindirizza alla pagina di conferma
          this.$router.push({ name: 'thanks' }); // Assicurati di avere una route chiamata 'orderConfirmation'

          // Opzionale: reindirizza alla home dopo 5 secondi
          setTimeout(() => {
            this.$router.push({ name: 'home' }); // Assicurati di avere una route chiamata 'home'
          }, 5000);
        } else {
          alert('Errore nel completamento dell\'ordine: ' + data.message);
        }
      })
      .catch(err => {
        console.error('Errore nella richiesta:', err);
        alert('Si è verificato un errore durante il completamento dell\'ordine.');
      });
  }).catch(err => {
    console.error('Errore nella richiesta di pagamento:', err);
    alert('Errore nella richiesta di pagamento.');
  });
}
  }
}
</script>

<style scoped>
.checkout-container {
  padding: 20px;
  max-width: 60rem;
  margin: auto;
  font-family: Arial, sans-serif;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.row {
  display: flex;
  flex-wrap: wrap;
}

.col-md-8,
.col-md-4 {
  padding: 10px;
}

.cart-items {
  margin-bottom: 20px;
}

h1,
h2 {
  color: #333;
}

.form-group {
  margin-bottom: 15px;
}

input,
select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  transition: border-color 0.3s;
}

input:focus,
select:focus {
  border-color: #007bff;
  outline: none;
}

.custom-checkbox {
  width: 15px;
  /* Dimensione personalizzata */
  height: 15px;
  /* Dimensione personalizzata */
  margin-right: 10px;
  /* Spazio tra checkbox e label */
}

.form-group.d-flex {
  justify-content: center;
  /* Centra orizzontalmente */
  align-items: center;
  /* Centra verticalmente */
}

.submit-button {
  background-color: #007bff;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.submit-button:hover {
  background-color: #0056b3;
}

.card {
  margin-bottom: 10px;
  /* Spazio tra le card */
}
</style>