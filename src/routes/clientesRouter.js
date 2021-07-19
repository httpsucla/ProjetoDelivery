const express = require("express");
const clientesRouter = express.Router();
const clientesController = require("../controllers/clientesController");

clientesRouter.post("/newCliente",clientesController.newCliente);
clientesRouter.get("/listAllCliente", clientesController.listAllCliente);
clientesRouter.post("/searchClienteByCNPJ", clientesController.searchClienteByCNPJ);
clientesRouter.put("/updateCliente", clientesController.updateCliente);
clientesRouter.delete("/deleteCliente/:id", clientesController.deleteCliente);

module.exports = clientesRouter;