module.exports = app => {
    const departamentos = require("../controllers/departamento.controller");
    var router = require("express").Router();

    router.post("/", departamentos.create);
    router.get("/", departamentos.findAll);
    router.put("/:id", departamentos.update);
    router.delete("/:id", departamentos.delete);

    app.use("/departamentos", router);
};