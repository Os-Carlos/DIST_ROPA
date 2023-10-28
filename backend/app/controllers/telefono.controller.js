const db = require("../models");
const Telefono = db.telefonos;
const Op = db.Sequelize.Op;

//post
exports.create = (req, res) => {
    const telefono = {
        numero: req.body.numero,
        id_cliente: req.body.id_cliente || null,
        id_empleado: req.body.id_empleado || null,
        id_proveedor: req.body.id_proveedor || null,
        id_sucursal: req.body.id_sucursal || null,
        extension: req.body.extension
    }

    Telefono.create(telefono)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error al insertar el telefono"
            });
        });
};

//get all
exports.findAll = (req, res) => {
    Telefono.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error al obtener los telefonos"
            });
        });
};



//put
exports.update = (req, res) => {
    const id = req.params.id;

    Telefono.update(req.body, { where: { id_telefono: id } })
        .then(num => {
            if (num == 1) {
                res.send({ message: "Telefono actualizado correctamente" });
            } else {
                res.send({ message: `El telefono con id: ${id}, no pudo ser actualizado` });
            };
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || `Error al actualizar el telefono con id: ${id}`
            });
        });
};

//delete
exports.delete = (req, res) => {
    const id = req.params.id;

    Telefono.destroy({ where: { id_telefono: id } })
        .then(num => {
            if (num == 1) {
                res.send({ message: "Telefono eliminado correctamente" });
            } else {
                res.send({ message: `el telefono con id: ${id}, no existe` });
            };
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || `Error al eliminar el telefono con id: ${id}`
            });
        });
};