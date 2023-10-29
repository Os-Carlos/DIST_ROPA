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
        fecha: {
            type: Sequelize.DATEONLY,
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_DATE')
        },
        total: {
            type: Sequelize.FLOAT,
            allowNull: false,
            defaultValue: 0
        }
    }, {
        timestamps: false,
        tableName: 'compras'
    })
    return Compra;
}