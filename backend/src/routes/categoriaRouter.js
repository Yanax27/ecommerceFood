const express = require("express");
const router = express();

// Define tus rutas aquí
router.get('/', (req, res) => {
  res.send('Hello from categoria');
});

module.exports = router;


