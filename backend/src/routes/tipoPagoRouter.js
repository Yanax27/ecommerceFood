const express = require("express");
const router = express();

// Define tus rutas aquí
router.get('/', (req, res) => {
  res.send('Hello from tipoPago');
});

module.exports = router;


