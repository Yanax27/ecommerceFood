const { where } = require("sequelize");

class CategoriaDao {
    // Obtener todas las categorías
    async getAllCategorias(CategoriaModel) {
        try {
            return await CategoriaModel.findAll();
        } catch (error) {
            throw new Error(`Error al obtener todas las categorías: ${error.message}`);
        }
    }

    // Obtener una categoría por ID
    async getCategoriaById(id_categoria, CategoriaModel) {
        try {
            const categoria = await CategoriaModel.findByPk(id_categoria);
            if (!categoria) return null;
            return categoria;
        } catch (error) {
            throw new Error(`Error al obtener la categoría con ID ${id_categoria}: ${error.message}`);
        }
    }

    // Obtener una categoría por nombre
    async getCategoriaByNombre(nombre, CategoriaModel) {
        try {
            return await CategoriaModel.findOne({
                where: { nombre }
            });
        } catch (error) {
            throw new Error(`Error al obtener la categoría con nombre ${nombre}: ${error.message}`);
        }
    }

    // Crear una nueva categoría
    async createCategoria(categoriaData, CategoriaModel) {
        try {
            return await CategoriaModel.create(categoriaData);
        } catch (error) {
            throw new Error(`Error al crear la categoría: ${error.message}`);
        }
    }

    // Actualizar una categoría existente
    async updateCategoria(id_categoria, categoriaData, CategoriaModel) {
        try {
            const categoria = await CategoriaModel.findByPk(id_categoria);
            if (!categoria) return null;
            await categoria.update(categoriaData);
            return categoria;
        } catch (error) {
            throw new Error(`Error al actualizar la categoría con ID ${id_categoria}: ${error.message}`);
        }
    }

    // Eliminar una categoría por ID
    async deleteCategoria(id_categoria, CategoriaModel) {
        try {
            const categoria = await CategoriaModel.findByPk(id_categoria);
            if (!categoria) return null;
            await categoria.destroy();
            return categoria;
        } catch (error) {
            throw new Error(`Error al eliminar la categoría con ID ${id_categoria}: ${error.message}`);
        }
    }
}

module.exports = new CategoriaDao();
