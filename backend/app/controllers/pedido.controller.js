const db = require("../models");
const Pedido = db.pedidos;
const Op = db.Sequelize.Op;

//post
exports.create = (req, res) => {
    const pedido = {
        numero_factura: req.body.numero_factura,
        estado: req.body.estado
    }

    Pedido.create(pedido)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error al insertar el pedido"
            });
        });
};

//get all
exports.findAll = (req, res) => {
    Pedido.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error al obtener los pedidos"
            });
        });
};

//put
exports.update = (req, res) => {
    const id = req.params.id;

    Pedido.update(req.body, { where: { id_pedido: id } })
        .then(num => {
            if (num == 1) {
                res.send({ message: "Pedido actualizado correctamente" });
            } else {
                res.send({ message: `El pedido con id: ${id}, no pudo ser actualizado` });
            };
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || `Error al actualizar el pedido con id: ${id}`
            });
        });
};

//delete
exports.delete = (req, res) => {
    const id = req.params.id;

    Pedido.destroy({ where: { id_pedido: id } })
        .then(num => {
            if (num == 1) {
                res.send({ message: "Pedido eliminado correctamente" });
            } else {
                res.send({ message: `el pedido con id: ${id}, no existe` });
            };
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || `Error al eliminar el pedido con id: ${id}`
            });
        });
};