const express = require("express");
const motoboysRouter = express.Router();
const motoboysController = require("../controllers/motoboysController");

motoboysRouter.post("/newMotoboy",motoboysController.newMotoboy);
motoboysRouter.get("/listAllMotoboy", motoboysController.listAllMotoboy);
motoboysRouter.post("/searchMotoboyByCPF", motoboysController.searchMotoboyByCPF);
motoboysRouter.put("/updateMotoboy", motoboysController.updateMotoboy);
motoboysRouter.delete("/deleteMotoboy", motoboysController.deleteMotoboy);

module.exports = motoboysRouter;