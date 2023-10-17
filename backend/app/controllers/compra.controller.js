const db = require("../models");
const Compra = db.compras;
const Op = db.Sequelize.Op;

//post
exports.create = (req, res) => {
    const compra = {
        numero_factura: req.body.numero_factura,
        id_proveedor: req.body.id_proveedor
    }

    Compra.create(compra)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error al insertar la compra"
            });
        });
};

//get all
exports.findAll = (req, res) => {
    Compra.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error al obtener las compras"
            });
        });
};

//put
exports.update = (req, res) => {
    const id = req.params.id;

    Compra.update(req.body, { where: { id_compra: id } })
        .then(num => {
            if (num == 1) {
                res.send({ message: "Compra actualizada correctamente" });
            } else {
                res.send({ message: `La compra con id: ${id}, no pudo ser actualizada` });
            };
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || `Error al actualizar la compra con id: ${id}`
            });
        });
};

//delete
exports.delete = (req, res) => {
    const id = req.params.id;

    Compra.destroy({ where: { id_compra: id } })
        .then(num => {
            if (num == 1) {
                res.send({ message: "Compra eliminada correctamente" });
            } else {
                res.send({ message: `La compra con id: ${id}, no existe` });
            };
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || `Error al eliminar la compra con id: ${id}`
            });
        });
};