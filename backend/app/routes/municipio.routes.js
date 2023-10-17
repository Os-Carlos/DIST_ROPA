module.exports = app => {
    const municipios = require("../controllers/municipio.controller");
    var router = require("express").Router();

    router.post("/", municipios.create);
    router.get("/", municipios.findAll);
    router.put("/:id", municipios.update);
    router.delete("/:id", municipios.delete);

    app.use("/municipios", router);
};