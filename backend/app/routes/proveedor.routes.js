module.exports = app => {
    const proveedores = require("../controllers/proveedor.controller");
    var router = require("express").Router();

    router.post("/", proveedores.create);
    router.get("/", proveedores.findAll);
    router.put("/:id", proveedores.update);
    router.delete("/:id", proveedores.delete);

    app.use("/proveedores", router);
};