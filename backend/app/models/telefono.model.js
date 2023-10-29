module.exports = (sequelize, Sequelize) => {
    const Telefono = sequelize.define('telefono', {
        id_telefono: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        numero: {
            type: Sequelize.STRING,
            primaryKey: true
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
        extension: {
            type: Sequelize.STRING
        }
    }, {
        timestamps: false,
        tableName: 'telefonos'
    })
    return Telefono;
}