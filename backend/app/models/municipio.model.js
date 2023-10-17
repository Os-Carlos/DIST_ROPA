module.exports = (sequelize, Sequelize) => {
    const Municipio = sequelize.define('municipio', {
        id_municipio: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_departamento: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        descripcion: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        tableName: 'municipios'
    })
    return Municipio;
}