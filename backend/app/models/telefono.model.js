module.exports = (sequelize, Sequelize) => {
    const Telefono = sequelize.define('telefono', {
        id_telefono: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        numero: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        id_entidad: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        extension: {
            type: Sequelize.STRING
        }
    }, {
        tableName: 'telefonos'
    })
    return Telefono;
}