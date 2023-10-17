module.exports = (sequelize, Sequelize) => {
    const Proveedor = sequelize.define('proveedor', {
        id_proveedor: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        rut: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        nombre: {
            type: Sequelize.STRING,
            allowNull: false
        },
        contacto: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        tableName: 'proveedores'
    })
    return Proveedor;
}