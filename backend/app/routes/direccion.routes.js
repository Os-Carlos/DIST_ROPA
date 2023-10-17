module.exports = app => {
    const direcciones = require("../controllers/direccion.controller");
    var router = require("express").Router();

    router.post("/", direcciones.create);
    router.get("/", direcciones.findAll);
    router.put("/:id", direcciones.update);
    router.delete("/:id", direcciones.delete);

    app.use("/direcciones", router);
};