module.exports = (sequelize, Sequelize) => {
    const Compra = sequelize.define('compra', {
        id_compra: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        numero_factura: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        id_proveedor: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        fecha_hora: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW
        },
        total: {
            type: Sequelize.FLOAT,
            allowNull: false,
            defaultValue: 0
        }
    }, {
        tableName: 'compras'
    })
    return Compra;
}