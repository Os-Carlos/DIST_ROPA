module.exports = app => {
    const compra_detalle = require("../controllers/compra_detalle.controller");
    var router = require("express").Router();

    router.post("/", compra_detalle.create);
    router.get("/", compra_detalle.findAll);
    router.put("/:id", compra_detalle.update);
    router.delete("/:id", compra_detalle.delete);

    app.use("/compra_detalle", router);
};