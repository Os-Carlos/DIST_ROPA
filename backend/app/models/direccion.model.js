module.exports = (sequelize, Sequelize) => {
    const Direccion = sequelize.define('direccion', {
        id_direccion: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_cliente: {
            type: Sequelize.INTEGER
        },
        id_empleado: {
            type: Sequelize.INTEGER
        },
        id_proveedor: {
            type: Sequelize.INTEGER
        },
        id_sucursal: {
            type: Sequelize.INTEGER
        },
        direccion_exacta: {
            type: Sequelize.STRING,
            allowNull: false
        },
        id_municipio: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        id_departamento: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'direcciones'
    })
    return Direccion;
}