const express = require("express");
const associadosRouter = express.Router();
const associadosController = require("../controllers/associadosController");
const auth = require("../middlewares/auth");

associadosRouter.post("/authentication", associadosController.authentication);
associadosRouter.post("/newAssociado", associadosController.newAssociado);
associadosRouter.get("/listAllAssociados", associadosController.listAllAssociados);
associadosRouter.post("/searchAssociadoByCNPJ", associadosController.searchAssociadoByCNPJ);
associadosRouter.put("/updateAssociado", associadosController.updateAssociado);
associadosRouter.delete("/deleteAssociado", associadosController.deleteAssociado);
associadosRouter.get("/logout", auth, associadosController.logout);

module.exports = associadosRouter;