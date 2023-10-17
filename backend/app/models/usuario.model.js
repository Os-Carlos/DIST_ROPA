module.exports = (sequelize, Sequelize) => {
    const Usuario = sequelize.define('usuario', {
        id_usuario: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_entidad: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        nombre: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        clave: {
            type: Sequelize.STRING,
            allowNull: false
        },
        tipo: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        tableName: 'usuarios'
    })
    return Usuario;
}