const db = require("../models");
const Cliente = db.clientes;
const Op = db.Sequelize.Op;

//post
exports.create = (req, res) => {
    const cliente = {
        rut: req.body.rut,
        nombre: req.body.nombre,
        razon_social: req.body.razon_social
    }

    Cliente.create(cliente)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error al insertar al cliente"
            });
        });
};

//get all
exports.findAll = (req, res) => {
    Cliente.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error al obtener los clientes"
            });
        });
};

//get by id
exports.findById = (req, res) => {
    const id = req.params.id;

    Cliente.findAll({ where: { id_cliente: id } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error al obtener los clientes"
            });
        });
};

//put
exports.update = (req, res) => {
    const id = req.params.id;

    Cliente.update(req.body, { where: { id_cliente: id } })
        .then(num => {
            if (num == 1) {
                res.send({ message: "Cliente actualizado correctamente" });
            } else {
                res.send({ message: `El cliente con id: ${id}, no pudo ser actualizado` });
            };
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || `Error al actualizar al cliente con id: ${id}`
            });
        });
};

//delete
exports.delete = (req, res) => {
    const id = req.params.id;

    Cliente.destroy({ where: { id_cliente: id } })
        .then(num => {
            if (num == 1) {
                res.send({ message: "Cliente eliminado correctamente" });
            } else {
                res.send({ message: `El cliente con id: ${id}, no existe` });
            };
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || `Error al eliminar al cliente con id: ${id}`
            });
        });
};