module.exports = (sequelize, Sequelize) => {
    const Empleado = sequelize.define('empleado', {
        id_empleado: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre_completo: {
            type: Sequelize.STRING,
            allowNull: false
        },
        puesto: {
            type: Sequelize.STRING,
            allowNull: false
        },
        comision: {
            type: Sequelize.STRING,
            allowNull: false
        },
        id_sucursal: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'empleados'
    })
    return Empleado;
}