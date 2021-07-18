const express = require("express");
const associadosRouter = express.Router();
const associadosController = require("../controllers/associadosController");

associadosRouter.post("/newAssociado",associadosController.newAssociado);
associadosRouter.get("/listAllAssociados", associadosController.listAllAssociados);
associadosRouter.post("/searchAssociadoByCNPJ", associadosController.searchAssociadoByCNPJ);
associadosRouter.put("/updateAssociado", associadosController.updateAssociado);
associadosRouter.delete("/deleteAssociado", associadosController.deleteAssociado);

module.exports = associadosRouter;