const express = require("express");
const associadosRouter = express.Router();
const associadosController = require("../controllers/associadosController");
const auth = require("../middlewares/auth");

associadosRouter.post("/authentication", associadosController.authentication);
associadosRouter.post("/newAssociado", auth, associadosController.newAssociado);
associadosRouter.get("/listAllAssociados", auth, associadosController.listAllAssociados);
associadosRouter.post("/searchAssociadoByCNPJ", auth, associadosController.searchAssociadoByCNPJ);
associadosRouter.put("/updateAssociado", auth, associadosController.updateAssociado);
associadosRouter.delete("/deleteAssociado", auth, associadosController.deleteAssociado);
associadosRouter.get("/logout", auth, associadosController.logout);

module.exports = associadosRouter;