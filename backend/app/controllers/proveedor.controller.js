const db = require("../models");
const Proveedor = db.proveedores;
const Op = db.Sequelize.Op;

//post
exports.create = (req, res) => {
    const proveedor = {
        nombre: req.body.nombre,
        contacto: req.body.contacto,
        rut: req.body.rut
    }

    Proveedor.create(proveedor)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error al insertar al proveedor"
            });
        });
};

//get all
exports.findAll = (req, res) => {
    Proveedor.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error al obtener los proveedores"
            });
        });
};

//put
exports.update = (req, res) => {
    const id = req.params.id;

    Proveedor.update(req.body, { where: { id_proveedor: id } })
        .then(num => {
            if (num == 1) {
                res.send({ message: "Proveedor actualizado correctamente" });
            } else {
                res.send({ message: `El proveedor con id: ${id}, no pudo ser actualizado` });
            };
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || `Error al actualizar al proveedor con id: ${id}`
            });
        });
};

//delete
exports.delete = (req, res) => {
    const id = req.params.id;

    Proveedor.destroy({ where: { id_proveedor: id } })
        .then(num => {
            if (num == 1) {
                res.send({ message: "Proveedor eliminado correctamente" });
            } else {
                res.send({ message: `el proveedor con id: ${id}, no existe` });
            };
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || `Error al eliminar al proveedor con id: ${id}`
            });
        });
};