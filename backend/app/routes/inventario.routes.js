module.exports = app => {
    const inventarios = require("../controllers/inventario.controller");
    var router = require("express").Router();

    router.post("/", inventarios.create);
    router.get("/", inventarios.findAll);
    router.put("/:id", inventarios.update);
    router.delete("/:id", inventarios.delete);

    app.use("/inventarios", router);
};