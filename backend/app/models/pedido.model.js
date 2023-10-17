module.exports = (sequelize, Sequelize) => {
    const Pedido = sequelize.define('pedido', {
        id_pedido: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        numero_factura: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        estado: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        tableName: 'pedidos'
    })
    return Pedido;
}