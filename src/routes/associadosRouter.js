const express = require("express");
const associadosRouter = express.Router();
const associadosController = require("../controllers/associadosController");

associadosRouter.post("/newAssociados",associadosController.newAssociado);
associadosRouter.get("/listAllAssociados", associadosController.listAllAssociados);
associadosRouter.post("/searchAssociadoByCNPJ", associadosController.searchAssociadoByCNPJ);
associadosRouter.put("/updateAssociado", associadosController.updateAssociado);

module.exports = associadosRouter;