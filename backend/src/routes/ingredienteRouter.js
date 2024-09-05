const express = require("express");
const ingredienteController = require("../controllers/ingredienteController");
const router = express();
// Define tus rutas aquí
/*router.get('/', (req, res) => {
  res.send('Hello from ingrediente');
});
*/
router.get('/', ingredienteController.getAllIngredientes);
router.get('/:id_ingrediente', ingredienteController.getIngredienteById);
router.post('/', ingredienteController.createIngrediente);
router.patch('/:id_ingrediente', ingredienteController.updateIngrediente);
router.delete('/:id_ingrediente', ingredienteController.deleteIngrediente);
module.exports = router;

