module.exports = (sequelize, Sequelize) => {
    const Factura = sequelize.define('factura', {
        id_factura: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        numero_factura: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        id_cliente: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        id_empleado: {
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
        tableName: 'facturas'
    })
    return Factura;
}