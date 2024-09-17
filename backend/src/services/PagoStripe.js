// src/services/PagoStripe.js
const stripe = require('./Stripe');
const { Pago } = require('../db'); // Ajusta la ruta a tu modelo de Sequelize

const crearPaymentIntent = async (amount, currency, paymentMethodId,returnUrl) => {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount, // Monto en la moneda especificada (en centavos)
        currency: currency,
        payment_method: paymentMethodId,
        confirm: true, // Intenta confirmar el PaymentIntent inmediatamente
        return_url: returnUrl,
      });
      const paymentMethod = await stripe.paymentMethods.retrieve(paymentMethodId);
      const nuevoPago = await Pago.create({
        nroTargeta: paymentMethod.card.last4,
        fechaVencimiento: new Date(paymentIntent.created * 1000), // Convertimos el timestamp a fecha
        cvc: null, // 
        qr: null, // Establecemos qr en null ya que no es aplicable para este pago
      });
      return { success: true,pago:nuevoPago, client_secret: paymentIntent.client_secret };
    } catch (error) {
      console.error('Error creando el pago', error);
      throw new Error(error.message);
    }
  };
module.exports = {
  crearPaymentIntent
};
