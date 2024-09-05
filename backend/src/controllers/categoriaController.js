const response = require('../utils/response');
const resError = require('../utils/resError');
const catchedAsync = require('../utils/catchedAsync');
const { Categoria } = require("../db");
const categoriaService = require('../services/CategoriaServices');

class CategoriaController {
    getAllCategorias = catchedAsync(async (req, res) => {
        const categorias = await categoriaService.getAllCategorias(Categoria);
        return response(res, 200, categorias);
    });

    getCategoriaById = catchedAsync(async (req, res) => {
        const { id_categoria } = req.params;
        const categoria = await categoriaService.getCategoriaById(id_categoria, Categoria);
        if (!categoria) {
            return resError(res, 404, "Categoría no encontrada");
        }
        return response(res, 200, categoria);
    });

    createCategoria = catchedAsync(async (req, res) => {
        const categoriaData = req.body;
        const categoria = await categoriaService.createCategoria(categoriaData, Categoria);
        return response(res, 201, categoria);
    });

    updateCategoria = catchedAsync(async (req, res) => {
        const { id_categoria } = req.params;
        const categoriaData = req.body;
        const categoria = await categoriaService.updateCategoria(id_categoria, categoriaData, Categoria);
        if (!categoria) {
            return resError(res, 404, "Categoría no encontrada");
        }
        return response(res, 200, categoria);
    });

    deleteCategoria = catchedAsync(async (req, res) => {
        const { id_categoria } = req.params;
        await categoriaService.deleteCategoria(id_categoria, Categoria);
        return response(res, 204, null);
    });
}

module.exports = new CategoriaController();
