module.exports = app => {
    const pedidos = require("../controllers/pedido.controller");
    var router = require("express").Router();

    router.post("/", pedidos.create);
    router.get("/", pedidos.findAll);
    router.put("/:id", pedidos.update);
    router.delete("/:id", pedidos.delete);

    app.use("/pedidos", router);
};