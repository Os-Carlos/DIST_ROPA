const db = require("../models");
const Usuario = db.usuarios;
const Op = db.Sequelize.Op;

//post
exports.create = (req, res) => {
    const usuario = {
        id_entidad: req.body.id_entidad,
        nombre: req.body.nombre,
        clave: req.body.clave,
        tipo: req.body.tipo
    }

    Usuario.create(usuario)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error al insertar al usuario"
            });
        });
};

//get all
exports.findAll = (req, res) => {
    Usuario.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error al obtener los usuarios"
            });
        });
};

//put
exports.update = (req, res) => {
    const id = req.params.id;

    Usuario.update(req.body, { where: { id_usuario: id } })
        .then(num => {
            if (num == 1) {
                res.send({ message: "Usuario actualizado correctamente" });
            } else {
                res.send({ message: `El usuario con id: ${id}, no pudo ser actualizado` });
            };
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || `Error al actualizar al usuario con id: ${id}`
            });
        });
};

//delete
exports.delete = (req, res) => {
    const id = req.params.id;

    Usuario.destroy({ where: { id_usuario: id } })
        .then(num => {
            if (num == 1) {
                res.send({ message: "Usuario eliminado correctamente" });
            } else {
                res.send({ message: `el usuario con id: ${id}, no existe` });
            };
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || `Error al eliminar al usuario con id: ${id}`
            });
        });
};