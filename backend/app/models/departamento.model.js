module.exports = (sequelize, Sequelize) => {
    const Departamento = sequelize.define('departamento', {
        id_departamento: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        descripcion: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        tableName: 'departamentos'
    })
    return Departamento;
}