const { where } = require("sequelize");
const db = require("../models");
const Departamento = db.departamentos;
const Municipio = db.municipios;
const Op = db.Sequelize.Op;

//post
exports.create = (req, res) => {
    const departamento = {
        descripcion: req.body.descripcion
    }

    Departamento.create(departamento)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error al insertar el departamento"
            });
        });
};

//get all
exports.findAll = (req, res) => {
    Departamento.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error al obtener los departamentos"
            });
        });
};

//get all municipios
exports.findMunicipios = async (req, res) => {
    const depto = req.params.depto;

    try {
        // Busca el departamento por descripción
        const departamento = await Departamento.findOne({ where: { id_departamento: depto } });

        if (!departamento) {
            return res.status(404).send({ message: "Departamento no encontrado" });
        }

        // Ahora que tienes el departamento, busca los municipios con el mismo id_departamento
        const municipios = await Municipio.findAll({ where: { id_departamento: departamento.id_departamento } });

        if (municipios.length === 0) {
            return res.status(404).send({ message: "No se encontraron municipios para este departamento" });
        }

        res.send(municipios);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Error al obtener los municipios"
        });
    }
};

//put
exports.update = (req, res) => {
    const id = req.params.id;

    Departamento.update(req.body, { where: { id_departamento: id } })
        .then(num => {
            if (num == 1) {
                res.send({ message: "Departamento actualizado correctamente" });
            } else {
                res.send({ message: `El departamento con id: ${id}, no pudo ser actualizado` });
            };
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || `Error al actualizar el departamento con id: ${id}`
            });
        });
};

//delete
exports.delete = (req, res) => {
    const id = req.params.id;

    Departamento.destroy({ where: { id_departamento: id } })
        .then(num => {
            if (num == 1) {
                res.send({ message: "Departamento eliminado correctamente" });
            } else {
                res.send({ message: `El departamento con id: ${id}, no existe` });
            };
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || `Error al eliminar el departamento con id: ${id}`
            });
        });
};