const db = require("../models");
const Sucursal = db.sucursales;
const Op = db.Sequelize.Op;

//post
exports.create = (req, res) => {
    const sucursal = {
        nombre: req.body.nombre,
        horario: req.body.horario
    }

    Sucursal.create(sucursal)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error al insertar la sucursal"
            });
        });
};

//get all
exports.findAll = (req, res) => {
    Sucursal.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error al obtener las sucursales"
            });
        });
};

//put
exports.update = (req, res) => {
    const id = req.params.id;

    Sucursal.update(req.body, { where: { id_sucursal: id } })
        .then(num => {
            if (num == 1) {
                res.send({ message: "Sucursal actualizada correctamente" });
            } else {
                res.send({ message: `La sucursal con id: ${id}, no pudo ser actualizada` });
            };
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || `Error al actualizar la sucursal con id: ${id}`
            });
        });
};

//delete
exports.delete = (req, res) => {
    const id = req.params.id;

    Sucursal.destroy({ where: { id_sucursal: id } })
        .then(num => {
            if (num == 1) {
                res.send({ message: "Sucursal eliminada correctamente" });
            } else {
                res.send({ message: `La sucursal con id: ${id}, no existe` });
            };
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || `Error al eliminar la sucursal con id: ${id}`
            });
        });
};