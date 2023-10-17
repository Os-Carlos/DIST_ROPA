module.exports = app => {
    const facturas = require("../controllers/factura.controller");
    var router = require("express").Router();

    router.post("/", facturas.create);
    router.get("/", facturas.findAll);
    router.put("/:id", facturas.update);
    router.delete("/:id", facturas.delete);

    app.use("/facturas", router);
};