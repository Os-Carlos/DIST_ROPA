module.exports = (sequelize, Sequelize) => {
    const Cliente = sequelize.define('cliente', {
        id_cliente: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        rut: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        nombre: {
            type: Sequelize.STRING,
            allowNull: false
        },
        razon_social: {
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
        timestamps: false,
        tableName: 'clientes'
    })
    return Cliente;
}