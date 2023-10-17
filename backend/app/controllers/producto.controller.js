const db = require("../models");
const Producto = db.productos;
const Op = db.Sequelize.Op;

//post
exports.create = (req, res) => {
    const producto = {
        descripcion: req.body.descripcion,
        id_proveedor: req.body.id_proveedor,
        precio_venta: req.body.precio_venta,
        stock: req.body.stock
    }

    Producto.create(producto)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error al insertar el producto"
            });
        });
};

//get all
exports.findAll = (req, res) => {
    Producto.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error al obtener los productos"
            });
        });
};

//put
exports.update = (req, res) => {
    const id = req.params.id;

    Producto.update(req.body, { where: { id_producto: id } })
        .then(num => {
            if (num == 1) {
                res.send({ message: "Producto actualizado correctamente" });
            } else {
                res.send({ message: `El producto con id: ${id}, no pudo ser actualizado` });
            };
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || `Error al actualizar el producto con id: ${id}`
            });
        });
};

//delete
exports.delete = (req, res) => {
    const id = req.params.id;

    Producto.destroy({ where: { id_producto: id } })
        .then(num => {
            if (num == 1) {
                res.send({ message: "Producto eliminado correctamente" });
            } else {
                res.send({ message: `el producto con id: ${id}, no existe` });
            };
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || `Error al eliminar el producto con id: ${id}`
            });
        });
};