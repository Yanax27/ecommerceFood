const express = require("express");
const router = express();

// Define tus rutas aquí
router.get('/', (req, res) => {
  res.send('Hello from pago');
});
const pagoController = require('../controllers/pagoController');

router.post('/', pagoController.createPago);
router.post('/capture', pagoController.capturePago); // Endpoint para capturar pagos
router.post('/stripe', pagoController.crearPaymentIntent);
router.patch('/stripe/actualizar', pagoController.actualizarPago);
module.exports = router;


