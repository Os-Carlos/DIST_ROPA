module.exports = (sequelize, Sequelize) => {
    const Inventario = sequelize.define('inventario', {
        id_inventario: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fecha: {
            type: Sequelize.DATEONLY,
            primaryKey: true
        },
        id_producto: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        id_sucursal: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        stock: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        precio_venta: {
            type: Sequelize.FLOAT,
            allowNull: false
        },
        precio_compra: {
            type: Sequelize.FLOAT,
            allowNull: false
        }
    }, {
        tableName: 'inventarios'
    })
    return Inventario;
}