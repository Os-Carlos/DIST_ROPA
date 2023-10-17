module.exports = (sequelize, Sequelize) => {
    const Compra_Detalle = sequelize.define('compra_detalle', {
        id_compra_detalle: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        numero_factura: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        id_producto: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        cantidad: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'compra_detalles'
    })
    return Compra_Detalle;
}