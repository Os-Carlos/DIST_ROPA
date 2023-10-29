module.exports = app => {
    const departamentos = require("../controllers/departamento.controller");
    var router = require("express").Router();

    router.post("/", departamentos.create);
    router.get("/", departamentos.findAll);
    router.get("/:depto/municipios", departamentos.findMunicipios);
    router.put("/:id", departamentos.update);
    router.delete("/:id", departamentos.delete);

    app.use("/departamentos", router);
};