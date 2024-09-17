const paypal = require('@paypal/checkout-server-sdk');
require('dotenv').config();

// Configuración del entorno
function environment() {
    return process.env.PAYPAL_ENVIRONMENT === 'sandbox' ?
        new paypal.core.SandboxEnvironment(process.env.PAYPAL_CLIENT_ID, process.env.PAYPAL_CLIENT_SECRET) :
        new paypal.core.LiveEnvironment(process.env.PAYPAL_CLIENT_ID, process.env.PAYPAL_CLIENT_SECRET);
}

// Crea el cliente de PayPal
function client() {
    return new paypal.core.PayPalHttpClient(environment());
}

module.exports = { client };
