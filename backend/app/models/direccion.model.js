module.exports = (sequelize, Sequelize) => {
    const Direccion = sequelize.define('direccion', {
        id_direccion: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_entidad: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        direccion_exacta: {
            type: Sequelize.STRING,
            allowNull: false
        },
        id_municipio: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        id_departamento: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'direcciones'
    })
    return Direccion;
}