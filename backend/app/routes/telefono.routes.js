module.exports = app => {
    const telefonos = require("../controllers/telefono.controller");
    var router = require("express").Router();

    router.post("/", telefonos.create);
    router.get("/", telefonos.findAll);
    router.put("/:id", telefonos.update);
    router.delete("/:id", telefonos.delete);

    app.use("/telefonos", router);
};