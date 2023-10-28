module.exports = (sequelize, Sequelize) => {
    const Producto = sequelize.define('producto', {
        id_producto: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        descripcion: {
            type: Sequelize.STRING,
            allowNull: false
        },
        id_proveedor: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        precio_venta: {
            type: Sequelize.FLOAT,
            allowNull: false
        },
        stock: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }, {
        timestamps: false
    }, {
        tableName: 'productos'
    })
    return Producto;
}