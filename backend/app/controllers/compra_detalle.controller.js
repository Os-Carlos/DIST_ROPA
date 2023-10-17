const db = require("../models");
const Compra_Detalle = db.compra_detalles;
const Op = db.Sequelize.Op;

//post
exports.create = (req, res) => {
    const compra_detalle = {
        numero_factura: req.body.numero_factura,
        id_producto: req.body.id_producto,
        cantidad: req.body.cantidad
    }

    Compra_Detalle.create(compra_detalle)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error al insertar el compra_detalle"
            });
        });
};

//get all
exports.findAll = (req, res) => {
    Compra_Detalle.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error al obtener los compra_detalles"
            });
        });
};

//put
exports.update = (req, res) => {
    const id = req.params.id;

    Compra_Detalle.update(req.body, { where: { id_compra_detalle: id } })
        .then(num => {
            if (num == 1) {
                res.send({ message: "Compra_Detalle actualizado correctamente" });
            } else {
                res.send({ message: `El compra_detalle con id: ${id}, no pudo ser actualizado` });
            };
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || `Error al actualizar el compra_detalle con id: ${id}`
            });
        });
};

//delete
exports.delete = (req, res) => {
    const id = req.params.id;

    Compra_Detalle.destroy({ where: { id_compra_detalle: id } })
        .then(num => {
            if (num == 1) {
                res.send({ message: "Compra_Detalle eliminado correctamente" });
            } else {
                res.send({ message: `El compra_detalle con id: ${id}, no existe` });
            };
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || `Error al eliminar el compra_detalle con id: ${id}`
            });
        });
};