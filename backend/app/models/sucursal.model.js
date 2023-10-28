module.exports = (sequelize, Sequelize) => {
    const Sucursal = sequelize.define('sucursal', {
        id_sucursal: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: Sequelize.STRING,
            allowNull: false
        },
        horario: {
            type: Sequelize.STRING,
            allowNull: false
        },
        telefono: {
            type: Sequelize.STRING,
            allowNull: false
        },
        direccion: {
            type: Sequelize.STRING,
            allowNull: false
        },
        id_departamento: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        id_municipio: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }, {
        timestamps: false
    }, {
        tableName: 'sucursales'
    })
    return Sucursal;
}