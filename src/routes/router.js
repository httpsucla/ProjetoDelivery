const express = require("express");
const associadosRouter = require("./associadosRouter");
const motoboysRouter = require("./motoboysRouter");
const clientesRouter = require("./clientesRouter");
const entregasRouter = require("./entregasRouter");

router.get("/", (res, req) => {
    res.send("It's working");
});

router.use("/associados", associadosRouter);
router.use("/motoboys", motoboysRouter);
router.use("/clientes", clientesRouter);
router.use("/entregas", entregasRouter);

module.exports = router;