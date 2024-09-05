const { ClientError } = require('../utils/errors');
const IngredienteDao = require('../daos/ingredienteDao');

class IngredienteService {
    async getAllIngredientes(IngredienteModel) {
        return await IngredienteDao.getAllIngredientes(IngredienteModel);
    }

    async getIngredienteById(id_Ingrediente, IngredienteModel) {
        const Ingrediente = await IngredienteDao.getIngredienteById(id_Ingrediente, IngredienteModel);
        if (!Ingrediente) {
            throw new ClientError('Ingrediente no encontrado', 404);
        }
        return Ingrediente;
    }

    async getIngredienteByNombre(nombre, IngredienteModel) {
        const Ingrediente = await IngredienteDao.getIngredienteByNombre(nombre, IngredienteModel);
        if (!Ingrediente) {
            throw new ClientError('Ingrediente no encontrado', 404);
        }
        return Ingrediente;
    }

    async createIngrediente(IngredienteData, IngredienteModel) {
        if (!IngredienteData) {
            throw new ClientError('Datos del Ingrediente son requeridos', 400);
        }
        return await IngredienteDao.createIngrediente(IngredienteData, IngredienteModel);
    }

    async updateIngrediente(id_Ingrediente, IngredienteData, IngredienteModel) {
        const Ingrediente = await IngredienteDao.updateIngrediente(id_Ingrediente, IngredienteData, IngredienteModel);
        if (!Ingrediente) {
            throw new ClientError('Ingrediente no encontrado', 404);
        }
        return Ingrediente;
    }

    async deleteIngrediente(id_Ingrediente, IngredienteModel) {
        const Ingrediente = await IngredienteDao.deleteIngrediente(id_Ingrediente, IngredienteModel);
        if (!Ingrediente) {
            throw new ClientError('Ingrediente no encontrado', 404);
        }
        return Ingrediente;
    }
}

module.exports = new IngredienteService();
