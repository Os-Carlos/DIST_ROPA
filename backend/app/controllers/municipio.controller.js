const db = require("../models");
const Municipio = db.municipios;
const Op = db.Sequelize.Op;

//post
exports.create = (req, res) => {
    const municipio = {
        id_departamento: req.body.id_departamento,
        descripcion: req.body.descripcion
    }

    Municipio.create(municipio)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error al insertar el municipio"
            });
        });
};

//get all
exports.findAll = (req, res) => {
    Municipio.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error al obtener los municipios"
            });
        });
};

//put
exports.update = (req, res) => {
    const id = req.params.id;

    Municipio.update(req.body, { where: { id_municipio: id } })
        .then(num => {
            if (num == 1) {
                res.send({ message: "Municipio actualizado correctamente" });
            } else {
                res.send({ message: `El municipio con id: ${id}, no pudo ser actualizado` });
            };
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || `Error al actualizar el municipio con id: ${id}`
            });
        });
};

//delete
exports.delete = (req, res) => {
    const id = req.params.id;

    Municipio.destroy({ where: { id_municipio: id } })
        .then(num => {
            if (num == 1) {
                res.send({ message: "Municipio eliminado correctamente" });
            } else {
                res.send({ message: `el municipio con id: ${id}, no existe` });
            };
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || `Error al eliminar el municipio con id: ${id}`
            });
        });
};