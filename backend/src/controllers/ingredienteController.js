const response = require('../utils/response');
const resError = require('../utils/resError');
const catchedAsync = require('../utils/catchedAsync');
const { Ingrediente } = require("../db");
const IngredienteServices = require('../services/IngredienteServices');

class IngredienteController {
    getAllIngredientes = catchedAsync(async (req, res) => {
        const ingrediente = await IngredienteServices.getAllIngredientes(Ingrediente);
        return response(res, 200, ingrediente);
    });

    getIngredienteById = catchedAsync(async (req, res) => {
        const { id_ingrediente } = req.params;
        const ingrediente = await IngredienteServices.getIngredienteById(id_ingrediente, Ingrediente);
        if (!ingrediente) {
            return resError(res, 404, "Ingrediente no encontrado");
        }
        return response(res, 200, ingrediente);
    });

    createIngrediente = catchedAsync(async (req, res) => {
        const ingredienteData = req.body;
        const ingrediente = await IngredienteServices.createIngrediente(ingredienteData,Ingrediente);
        return response(res, 201, ingrediente);
    });

    updateIngrediente = catchedAsync(async (req, res) => {
        const { id_ingrediente } = req.params;
        const ingredienteData = req.body;
        const ingrediente = await IngredienteServices.updateIngrediente(id_ingrediente, ingredienteData, Ingrediente);
        if (!ingrediente) {
            return resError(res, 404, "Ingrediente no encontrado");
        }
        return response(res, 200, ingrediente);
    });

    deleteIngrediente = catchedAsync(async (req, res) => {
        const { id_ingrediente } = req.params;
        await IngredienteServices.deleteIngrediente(id_ingrediente, Ingrediente);
        return response(res, 204, null);
    });
}

module.exports = new IngredienteController();
