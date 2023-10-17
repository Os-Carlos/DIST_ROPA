module.exports = app => {
    const factura_detalle = require("../controllers/factura_detalle.controller");
    var router = require("express").Router();

    router.post("/", factura_detalle.create);
    router.get("/", factura_detalle.findAll);
    router.put("/:id", factura_detalle.update);
    router.delete("/:id", factura_detalle.delete);

    app.use("/factura_detalle", router);
};