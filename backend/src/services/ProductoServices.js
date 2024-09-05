const ProductoDao = require('../daos/ProductoDao');
const { ClientError } = require('../utils/errors');

class ProductoService {
    async getAllProducto(ProductoModel) {
        return await ProductoDao.getAllProducto(ProductoModel);
    }

    async getProductoById(id_producto, ProductoModel) {
        const producto = await ProductoDao.getProductoById(id_producto, ProductoModel);
        if (!producto) {
            throw new ClientError('Producto no encontrado', 404);
        }
        return producto;
    }

    async getproductoByNombre(nombre, productoModel) {
        const producto = await productoDao.getproductoByNombre(nombre, productoModel);
        if (!producto) {
            throw new ClientError('Categoría no encontrada', 404);
        }
        return producto;
    }

    async createProducto(ProductoData, ProductoModel) {
        if (!ProductoData) {
            throw new ClientError('Datos del producto son requeridos', 400);
        }
        return await ProductoDao.createProducto(ProductoData, ProductoModel);
    }

    async updateProducto(id_producto, ProductoData, ProductoModel) {
        const producto = await ProductoDao.updateProducto(id_producto, ProductoData, ProductoModel);
        if (!producto) {
            throw new ClientError('Producto no encontrada', 404);
        }
        return producto;
    }

    async deleteProducto(id_producto, ProductoModel) {
        const producto = await ProductoDao.deleteProducto(id_producto, ProductoModel);
        if (!producto) {
            throw new ClientError('Producto no encontrado', 404);
        }
        return producto;
    }
}

module.exports = new ProductoService();
