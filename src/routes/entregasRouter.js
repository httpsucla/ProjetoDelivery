const express = require("express");
const entregasRouter = express.Router();
const entregasController = require("../controllers/entregasController");

entregasRouter.post("/newEntrega",entregasController.newEntrega);
entregasRouter.get("/listAllEntrega", entregasController.listAllEntrega);
entregasRouter.get("/listEntregaReal", entregasController.listEntregaReal);
entregasRouter.get("/listEntregaPend", entregasController.listEntregaPend);
entregasRouter.get("/searchEntregaByMotoboy", entregasController.searchEntregaByMotoboy);
entregasRouter.put("/updateEntregaPend", entregasController.updateEntregaPend);
entregasRouter.delete("/deleteEntrega", entregasController.deleteEntrega);


module.exports = entregasRouter;