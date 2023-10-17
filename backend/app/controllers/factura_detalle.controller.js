const db = require("../models");
const Factura_Detalle = db.factura_detalles;
const Op = db.Sequelize.Op;

//post
exports.create = (req, res) => {
    const factura_detalle = {
        numero_factura: req.body.numero_factura,
        id_producto: req.body.id_producto,
        cantidad: req.body.cantidad
    }

    Factura_Detalle.create(factura_detalle)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error al insertar el factura_detalle"
            });
        });
};

//get all
exports.findAll = (req, res) => {
    Factura_Detalle.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error al obtener los factura_detalles"
            });
        });
};

//put
exports.update = (req, res) => {
    const id = req.params.id;

    Factura_Detalle.update(req.body, { where: { id_factura_detalle: id } })
        .then(num => {
            if (num == 1) {
                res.send({ message: "Factura_Detalle actualizado correctamente" });
            } else {
                res.send({ message: `El factura_detalle con id: ${id}, no pudo ser actualizado` });
            };
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || `Error al actualizar el factura_detalle con id: ${id}`
            });
        });
};

//delete
exports.delete = (req, res) => {
    const id = req.params.id;

    Factura_Detalle.destroy({ where: { id_factura_detalle: id } })
        .then(num => {
            if (num == 1) {
                res.send({ message: "Factura_Detalle eliminado correctamente" });
            } else {
                res.send({ message: `El factura_detalle con id: ${id}, no existe` });
            };
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || `Error al eliminar el factura_detalle con id: ${id}`
            });
        });
};