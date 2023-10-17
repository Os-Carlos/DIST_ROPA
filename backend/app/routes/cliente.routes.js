module.exports = app => {
    const clientes = require("../controllers/cliente.controller");
    var router = require("express").Router();

    router.post("/", clientes.create);
    router.get("/", clientes.findAll);
    router.put("/:id", clientes.update);
    router.delete("/:id", clientes.delete);

    app.use("/clientes", router);
};