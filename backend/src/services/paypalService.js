const paypal = require('@paypal/checkout-server-sdk');
const { client } = require('./paypalClient');
require('dotenv').config();

// Crear una orden en PayPal
async function createOrder(amount) {
    if (!amount || isNaN(amount) || amount <= 0) {
        throw new Error('El monto debe ser un número positivo.');
    }

    const request = new paypal.orders.OrdersCreateRequest();
    request.headers['Content-Type'] = 'application/json';
    request.requestBody({
        intent: 'CAPTURE',
        purchase_units: [{
            amount: {
                currency_code: 'USD',
                value: amount // Asegúrate de que el valor tenga dos decimales
            }
        }],
        application_context: {
            return_url: 'http://localhost:3001/api/pago/capture',
            cancel_url: 'http://localhost:3001/api/pago/cancel'
        }
    });

    try {
        const response = await client().execute(request);
        console.log('Create Order Response:', response.result);

        // Buscar el enlace de aprobación
        const approvalUrl = response.result.links.find(link => link.rel === 'approve')?.href;
        if (!approvalUrl) {
            throw new Error('Approval URL not found in PayPal response.');
        }

        return { approvalUrl, orderId: response.result.id };
    } catch (err) {
        console.error('Error creating order:', err);
        throw err;
    }
}

// Capturar el pago en PayPal
async function captureOrder(orderId) {
    if (!orderId) {
        throw new Error('El ID de la orden es requerido.');
    }

    const request = new paypal.orders.OrdersCaptureRequest(orderId);
    request.headers['Content-Type'] = 'application/json';

    try {
        const response = await client().execute(request);
        console.log('Capture Order Response:', response.result);

        return response.result;
    } catch (err) {
        console.error('Error capturing order:', err);
        throw err;
    }
}

module.exports = { createOrder, captureOrder };
