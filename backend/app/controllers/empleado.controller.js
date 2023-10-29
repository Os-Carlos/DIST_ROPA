const db = require("../models");
const Empleado = db.empleados;
const Op = db.Sequelize.Op;

//post
exports.create = (req, res) => {
    const empleado = {
        nombre_completo: req.body.nombre_completo,
        puesto: req.body.puesto,
        comision: req.body.comision,
        id_sucursal: req.body.id_sucursal,
        telefono: req.body.telefono,
        direccion: req.body.direccion,
        id_departamento: req.body.id_departamento,
        id_municipio: req.body.id_municipio
    }

    Empleado.create(empleado)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error al insertar al empleado"
            });
        });
};

//get all
exports.findAll = (req, res) => {
    Empleado.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error al obtener los empleados"
            });
        });
};

//put
exports.update = (req, res) => {
    const id = req.params.id;

    Empleado.update(req.body, { where: { id_empleado: id } })
        .then(num => {
            if (num == 1) {
                res.send({ message: "Empleado actualizado correctamente" });
            } else {
                res.send({ message: `El empleado con id: ${id}, no pudo ser actualizado` });
            };
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || `Error al actualizar al empleado con id: ${id}`
            });
        });
};

//delete
exports.delete = (req, res) => {
    const id = req.params.id;

    Empleado.destroy({ where: { id_empleado: id } })
        .then(num => {
            if (num == 1) {
                res.send({ message: "Empleado eliminado correctamente" });
            } else {
                res.send({ message: `El empleado con id: ${id}, no existe` });
            };
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || `Error al eliminar al empleado con id: ${id}`
            });
        });
};