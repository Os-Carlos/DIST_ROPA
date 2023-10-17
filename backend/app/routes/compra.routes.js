module.exports = app => {
    const compras = require("../controllers/compra.controller");
    var router = require("express").Router();

    router.post("/", compras.create);
    router.get("/", compras.findAll);
    router.put("/:id", compras.update);
    router.delete("/:id", compras.delete);

    app.use("/compras", router);
};