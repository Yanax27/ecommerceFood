const { Router } = require("express");
const categoriaRouter = require("./categoriaRouter");
const detallePedidoRouter = require("./detallePedidoRouter");
const imagenProducto = require("./imagenproductoRouter");
const ingredienteRouter = require("./ingredienteRouter");
const pagoRouter = require("./pagoRouter");
const tipoPagoRouter = require("./tipoPagoRouter");
const pedidoRouter = require("./pedidoRouter");
const productoRouter = require("./productoRouter");
const rolRouter = require('./rolRouter');
const usuarioRouter = require('./usuarioRouter')

const router = Router();

router.use("/categoria", categoriaRouter); //"http://localhost:3001/api/categoria"
router.use("/detalle-pedido", detallePedidoRouter); //"http://localhost:3001/api/detalle-pedido"
router.use("/imagen", imagenProducto); //"http://localhost:3001/api/imagen"
router.use("/ingrediente", ingredienteRouter); //"http://localhost:3001/api/ingrediente"
router.use("/pago", pagoRouter); //"http://localhost:3001/api/pago"
router.use("/tipo-pago", tipoPagoRouter); //"http://localhost:3001/api/tipo-pago"
router.use("/pedido", pedidoRouter); //"http://localhost:3001/api/pedido"
router.use("/producto", productoRouter); //"http://localhost:3001/api/producto"
router.use("/rol", rolRouter); //"http://localhost:3001/api/rol"
router.use("/usuario", usuarioRouter); //"http://localhost:3001/api/usuario"


module.exports = router;
