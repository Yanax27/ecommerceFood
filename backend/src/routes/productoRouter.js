const express = require("express");
const productoController = require("../controllers/productoController");
const router = express();

router.get('/', productoController.getAllProductos);
router.get('/:id_producto', productoController.getproductoById);
router.post('/', productoController.createproducto);
router.patch('/:id_producto', productoController.updateproducto);
router.delete('/:id_producto', productoController.deleteproducto);

module.exports = router;


