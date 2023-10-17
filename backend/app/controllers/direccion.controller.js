const db = require("../models");
const Direccion = db.direcciones;
const Op = db.Sequelize.Op;

//post
exports.create = (req, res) => {
    const direccion = {
        id_entidad: req.body.id_entidad,
        direccion_exacta: req.body.direccion_exacta,
        id_municipio: req.body.id_municipio,
        id_departamento: req.body.id_departamento
    }

    Direccion.create(direccion)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error al insertar la direccion"
            });
        });
};

//get all
exports.findAll = (req, res) => {
    Direccion.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error al obtener las direcciones"
            });
        });
};

//put
exports.update = (req, res) => {
    const id = req.params.id;

    Direccion.update(req.body, { where: { id_direccion: id } })
        .then(num => {
            if (num == 1) {
                res.send({ message: "Direccion actualizada correctamente" });
            } else {
                res.send({ message: `La direccion con id: ${id}, no pudo ser actualizada` });
            };
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || `Error al actualizar la direccion con id: ${id}`
            });
        });
};

//delete
exports.delete = (req, res) => {
    const id = req.params.id;

    Direccion.destroy({ where: { id_direccion: id } })
        .then(num => {
            if (num == 1) {
                res.send({ message: "Direccion eliminada correctamente" });
            } else {
                res.send({ message: `La direccion con id: ${id}, no existe` });
            };
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || `Error al eliminar la direccion con id: ${id}`
            });
        });
};