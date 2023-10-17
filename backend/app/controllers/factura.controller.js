const db = require("../models");
const Factura = db.facturas;
const Op = db.Sequelize.Op;

//post
exports.create = (req, res) => {
    const factura = {
        numero_factura: req.body.numero_factura,
        id_cliente: req.body.id_cliente,
        id_empleado: req.body.id_empleado
    }

    Factura.create(factura)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error al insertar la factura"
            });
        });
};

//get all
exports.findAll = (req, res) => {
    Factura.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error al obtener las facturas"
            });
        });
};

//put
exports.update = (req, res) => {
    const id = req.params.id;

    Factura.update(req.body, { where: { id_factura: id } })
        .then(num => {
            if (num == 1) {
                res.send({ message: "Factura actualizada correctamente" });
            } else {
                res.send({ message: `La factura con id: ${id}, no pudo ser actualizada` });
            };
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || `Error al actualizar la factura con id: ${id}`
            });
        });
};

//delete
exports.delete = (req, res) => {
    const id = req.params.id;

    Factura.destroy({ where: { id_factura: id } })
        .then(num => {
            if (num == 1) {
                res.send({ message: "Factura eliminada correctamente" });
            } else {
                res.send({ message: `La factura con id: ${id}, no existe` });
            };
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || `Error al eliminar la factura con id: ${id}`
            });
        });
};