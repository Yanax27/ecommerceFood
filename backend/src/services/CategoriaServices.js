const { ClientError } = require('../utils/errors');
const categoriaDao = require('../daos/CategoriaDao');

class CategoriaService {
    async getAllCategorias(CategoriaModel) {
        return await categoriaDao.getAllCategorias(CategoriaModel);
    }

    async getCategoriaById(id_categoria, CategoriaModel) {
        const categoria = await categoriaDao.getCategoriaById(id_categoria, CategoriaModel);
        if (!categoria) {
            throw new ClientError('Categoría no encontrada', 404);
        }
        return categoria;
    }

    async getCategoriaByNombre(nombre, CategoriaModel) {
        const categoria = await categoriaDao.getCategoriaByNombre(nombre, CategoriaModel);
        if (!categoria) {
            throw new ClientError('Categoría no encontrada', 404);
        }
        return categoria;
    }

    async createCategoria(categoriaData, CategoriaModel) {
        if (!categoriaData) {
            throw new ClientError('Datos de la categoría son requeridos', 400);
        }
        return await categoriaDao.createCategoria(categoriaData, CategoriaModel);
    }

    async updateCategoria(id_categoria, categoriaData, CategoriaModel) {
        const categoria = await categoriaDao.updateCategoria(id_categoria, categoriaData, CategoriaModel);
        if (!categoria) {
            throw new ClientError('Categoría no encontrada', 404);
        }
        return categoria;
    }

    async deleteCategoria(id_categoria, CategoriaModel) {
        const categoria = await categoriaDao.deleteCategoria(id_categoria, CategoriaModel);
        if (!categoria) {
            throw new ClientError('Categoría no encontrada', 404);
        }
        return categoria;
    }
}

module.exports = new CategoriaService();
