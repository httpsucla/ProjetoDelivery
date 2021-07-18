const express = require("express");
const motoboysRouter = express.Router();
const motoboysController = require("../controllers/motoboysController");
const auth = require("../middlewares/auth");

motoboysRouter.post("/authentication", motoboysController.authentication);
motoboysRouter.post("/newMotoboy", auth, motoboysController.newMotoboy);
motoboysRouter.get("/listAllMotoboy", auth, motoboysController.listAllMotoboy);
motoboysRouter.post("/searchMotoboyByCPF", auth, motoboysController.searchMotoboyByCPF);
motoboysRouter.put("/updateMotoboy", auth, motoboysController.updateMotoboy);
motoboysRouter.delete("/deleteMotoboy", auth, motoboysController.deleteMotoboy);
motoboysRouter.get("/logout", auth, motoboysController.logout);

module.exports = motoboysRouter;