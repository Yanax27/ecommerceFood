const paypalService = require('../services/paypalService');
const { Pago } = require('../db');
const paymentService = require('../services/PagoStripe');

// Crear un pago
const createPago = async (req, res) => {
    try {
        const { amount } = req.body;

        // Crear una orden en PayPal
        const { approvalUrl, orderId } = await paypalService.createOrder(amount);
        
        // Guardar información de pago en la base de datos
        const nuevoPago = await Pago.create({
            nroTargeta: null,
            fechaVencimiento: null,
            cvc: null,
            qr: null
        });

        res.status(201).json({ approval_url: approvalUrl, order_id: orderId, pago: nuevoPago });
    } catch (error) {
        console.error('Error creating payment:', error);
        res.status(500).json({ message: 'Error creating payment' });
    }
};

// Capturar el pago
const capturePago = async (req, res) => {
    try {
        const { orderId } = req.body;

        // Capturar el pago en PayPal
        const captureResponse = await paypalService.captureOrder(orderId);

        // Actualizar el estado del pago en la base de datos
        const pago = await Pago.findOne({ where: { id_pago: orderId } });
        if (pago) {
            await pago.update({
                qr: captureResponse.status
            });
            res.status(200).json(captureResponse);
        } else {
            res.status(404).json({ message: 'Payment record not found' });
        }
    } catch (error) {
        console.error('Error capturing payment:', error);
        res.status(500).json({ message: 'Error capturing payment' });
    }
};

const crearPaymentIntent = async (req, res) => {
    const { amount, currency, paymentMethodId, returnUrl } = req.body;
  
    if (!amount || !currency || !paymentMethodId || !returnUrl) {
      return res.status(400).json({ error: 'Missing required params: amount, currency, paymentMethodId, or returnUrl' });
    }
  
    try {
      const resultado = await paymentService.crearPaymentIntent(amount, currency, paymentMethodId, returnUrl);
      res.status(200).json(resultado);
    } catch (error) {
      console.error('Error procesando el intento de pago:', error);
      res.status(500).json({ error: error.message });
    }
  };
  const actualizarPago = async (req, res) => {
    try {
      const { id_pago, nroTargeta, fechaVencimiento, cvc, qr } = req.body;
  
      // Buscar el registro de pago en la base de datos
      const pago = await Pago.findOne({ where: { id_pago: id_pago } });
      if (pago) {
        // Actualizar los campos del pago
        await pago.update({
          nroTargeta: nroTargeta,
          fechaVencimiento: fechaVencimiento,
          cvc: cvc,
          qr: qr,
        });
        res.status(200).json({ message: 'Pago actualizado correctamente' });
      } else {
        res.status(404).json({ message: 'Registro de pago no encontrado' });
      }
    } catch (error) {
      console.error('Error actualizando el pago:', error);
      res.status(500).json({ message: 'Error actualizando el pago' });
    }
  };
module.exports = {
    createPago,
    capturePago,
    crearPaymentIntent,
    actualizarPago

};
