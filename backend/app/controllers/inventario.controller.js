const db = require("../models");
const Inventario = db.inventarios;
const Op = db.Sequelize.Op;

//post
exports.create = (req, res) => {
    const inventario = {
        fecha: req.body.fecha,
        id_producto: req.body.id_producto,
        id_sucursal: req.body.id_municipio,
        stock: req.body.stock,
        precio_venta: req.body.precio_venta,
        precio_compra: req.body.precio_compra
    }

    Inventario.create(inventario)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error al insertar el inventario"
            });
        });
};

//get all
exports.findAll = (req, res) => {
    Inventario.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error al obtener los inventarios"
            });
        });
};

//put
exports.update = (req, res) => {
    const id = req.params.id;

    Inventario.update(req.body, { where: { id_inventario: id } })
        .then(num => {
            if (num == 1) {
                res.send({ message: "Inventario actualizado correctamente" });
            } else {
                res.send({ message: `El inventario con id: ${id}, no pudo ser actualizado` });
            };
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || `Error al actualizar el inventario con id: ${id}`
            });
        });
};

//delete
exports.delete = (req, res) => {
    const id = req.params.id;

    Inventario.destroy({ where: { id_inventario: id } })
        .then(num => {
            if (num == 1) {
                res.send({ message: "Inventario eliminado correctamente" });
            } else {
                res.send({ message: `el inventario con id: ${id}, no existe` });
            };
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || `Error al eliminar el inventario con id: ${id}`
            });
        });
};