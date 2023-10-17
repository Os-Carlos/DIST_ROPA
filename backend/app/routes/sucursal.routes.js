module.exports = app => {
    const sucursales = require("../controllers/sucursal.controller");
    var router = require("express").Router();

    router.post("/", sucursales.create);
    router.get("/", sucursales.findAll);
    router.put("/:id", sucursales.update);
    router.delete("/:id", sucursales.delete);

    app.use("/sucursales", router);
};