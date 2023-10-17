module.exports = app => {
    const productos = require("../controllers/producto.controller");
    var router = require("express").Router();

    router.post("/", productos.create);
    router.get("/", productos.findAll);
    router.put("/:id", productos.update);
    router.delete("/:id", productos.delete);

    app.use("/productos", router);
};