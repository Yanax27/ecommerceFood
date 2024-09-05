const response = require('../utils/response');
const resError = require('../utils/resError');
const catchedAsync = require('../utils/catchedAsync');
const { Producto } = require("../db");
const ProductoServices = require('../services/ProductoServices');

class ProductoController {
    getAllProductos = catchedAsync(async (req, res) => {
        const productos = await ProductoServices.getAllProducto(Producto);
        return response(res, 200, productos);
    });

    getproductoById = catchedAsync(async (req, res) => {
        const { id_producto } = req.params;
        const producto = await ProductoServices.getProductoById(id_producto, Producto);
        if (!producto) {
            return resError(res, 404, "Producto no encontrado");
        }
        return response(res, 200, producto);
    });

    createproducto = catchedAsync(async (req, res) => {
        const productoData = req.body;
        const producto = await ProductoServices.createProducto(productoData, Producto);
        return response(res, 201, producto);
    });

    updateproducto = catchedAsync(async (req, res) => {
        const { id_producto } = req.params;
        const productoData = req.body;
        const producto = await ProductoServices.updateProducto(id_producto, productoData, Producto);
        if (!producto) {
            return resError(res, 404, "Producto no encontrado");
        }
        return response(res, 200, producto);
    });

    deleteproducto = catchedAsync(async (req, res) => {
        const { id_producto } = req.params;
        await ProductoServices.deleteProducto(id_producto, Producto);
        return response(res, 204, null);
    });
}

module.exports = new ProductoController();
