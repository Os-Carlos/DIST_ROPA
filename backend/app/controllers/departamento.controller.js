const db = require("../models");
const Departamento = db.departamentos;
const Op = db.Sequelize.Op;

//post
exports.create = (req, res) => {
    const departamento = {
        descripcion: req.body.descripcion
    }

    Departamento.create(departamento)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error al insertar el departamento"
            });
        });
};

//get all
exports.findAll = (req, res) => {
    Departamento.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error al obtener los departamentos"
            });
        });
};

//put
exports.update = (req, res) => {
    const id = req.params.id;

    Departamento.update(req.body, { where: { id_departamento: id } })
        .then(num => {
            if (num == 1) {
                res.send({ message: "Departamento actualizado correctamente" });
            } else {
                res.send({ message: `El departamento con id: ${id}, no pudo ser actualizado` });
            };
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || `Error al actualizar el departamento con id: ${id}`
            });
        });
};

//delete
exports.delete = (req, res) => {
    const id = req.params.id;

    Departamento.destroy({ where: { id_departamento: id } })
        .then(num => {
            if (num == 1) {
                res.send({ message: "Departamento eliminado correctamente" });
            } else {
                res.send({ message: `El departamento con id: ${id}, no existe` });
            };
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || `Error al eliminar el departamento con id: ${id}`
            });
        });
};