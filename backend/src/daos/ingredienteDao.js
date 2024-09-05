const { where } = require("sequelize");

class ingredienteDao {
    // Obtener todas las categorías
    async getAllIngredientes(IngredienteModel) {
        try {
            return await IngredienteModel.findAll();
        } catch (error) {
            throw new Error(`Error al obtener todos los ingredientes: ${error.message}`);
        }
    }

    // Obtener una categoría por ID
    async getIngredienteById(id_ingrediente, IngredienteModel) {
        try {
            const Ingrediente = await IngredienteModel.findByPk(id_ingrediente);
            if (!Ingrediente) return null;
            return Ingrediente;
        } catch (error) {
            throw new Error(`Error al obtener la categoría con ID ${id_ingrediente}: ${error.message}`);
        }
    }

    // Obtener una categoría por nombre
    async getIngredienteByNombre(nombre, IngredienteModel) {
        try {
            return await IngredienteModel.findOne({
                where: { nombre }
            });
        } catch (error) {
            throw new Error(`Error al obtener la categoría con nombre ${nombre}: ${error.message}`);
        }
    }

    // Crear una nueva categoría
    async createIngrediente(IngredienteData, IngredienteModel) {
        try {
            return await IngredienteModel.create(IngredienteData);
        } catch (error) {
            throw new Error(`Error al crear la categoría: ${error.message}`);
        }
    }

    // Actualizar una categoría existente
    async updateIngrediente(id_ingrediente, IngredienteData, IngredienteModel) {
        try {
            const Ingrediente = await IngredienteModel.findByPk(id_ingrediente);
            if (!Ingrediente) return null;
            await Ingrediente.update(IngredienteData);
            return Ingrediente;
        } catch (error) {
            throw new Error(`Error al actualizar la categoría con ID ${id_ingrediente}: ${error.message}`);
        }
    }

    // Eliminar una categoría por ID
    async deleteIngrediente(id_ingrediente, IngredienteModel) {
        try {
            const Ingrediente = await IngredienteModel.findByPk(id_ingrediente);
            if (!Ingrediente) return null;
            await Ingrediente.destroy();
            return Ingrediente;
        } catch (error) {
            throw new Error(`Error al eliminar la categoría con ID ${id_ingrediente}: ${error.message}`);
        }
    }
}

module.exports = new ingredienteDao();
