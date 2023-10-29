module.exports = (sequelize, Sequelize) => {
    const Factura_Detalle = sequelize.define('factura_detalle', {
        id_factura_detalle: {
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
        timestamps: false,
        tableName: 'factura_detalles'
    })
    return Factura_Detalle;
}