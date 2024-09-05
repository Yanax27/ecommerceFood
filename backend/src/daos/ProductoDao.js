const { where } = require("sequelize");

class ProductoDao {
    // Obtener todas las categorías
    async getAllProducto(ProductoModel) {
        try {
            return await ProductoModel.findAll();
        } catch (error) {
            throw new Error(`Error al obtener todos los productos: ${error.message}`);
        }
    }

    // Obtener una categoría por ID
    async getProductoById(id_producto, ProductoModel) {
        try {
            const producto = await ProductoModel.findByPk(id_producto);
            if (!producto) return null;
            return producto;
        } catch (error) {
            throw new Error(`Error al obtener el producto con ID ${id_producto}: ${error.message}`);
        }
    }

    // Obtener una categoría por nombre
    async getProductoByNombre(nombre, ProductoModel) {
        try {
            return await ProductoModel.findOne({
                where: { nombre }
            });
        } catch (error) {
            throw new Error(`Error al obtener el producto con nombre ${nombre}: ${error.message}`);
        }
    }

    // Crear una nueva categoría
    async createProducto(productoData, ProductoModel) {
        try {
            return await ProductoModel.create(productoData);
        } catch (error) {
            throw new Error(`Error al crear el producto: ${error.message}`);
        }
    }

    // Actualizar una categoría existente
    async updateProducto(id_producto, productoData, ProductoModel) {
        try {
            const producto = await ProductoModel.findByPk(id_producto);
            if (!producto) return null;
            await producto.update(productoData);
            return producto;
        } catch (error) {
            throw new Error(`Error al actualizar el producto con ID ${id_producto}: ${error.message}`);
        }
    }

    // Eliminar una categoría por ID
    async deleteProducto(id_producto, ProductoModel) {
        try {
            const producto = await ProductoModel.findByPk(id_producto);
            if (!producto) return null;
            await producto.destroy();
            return producto;
        } catch (error) {
            throw new Error(`Error al eliminar el producto con ID ${id_producto}: ${error.message}`);
        }
    }
}

module.exports = new ProductoDao();
