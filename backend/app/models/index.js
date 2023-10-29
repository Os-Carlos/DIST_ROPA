const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

//pool de conexion
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorAliases: false,
    dialectOptions: { ssl: true },
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle,
    }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

//importacion de modelos
db.clientes = require("./cliente.model.js")(sequelize, Sequelize);
db.compra_detalles = require("./compra_detalle.model.js")(sequelize, Sequelize);
db.compras = require("./compra.model.js")(sequelize, Sequelize);
db.empleados = require("./empleado.model.js")(sequelize, Sequelize);
db.factura_detalles = require("./factura_detalle.model.js")(sequelize, Sequelize);
db.facturas = require("./factura.model.js")(sequelize, Sequelize);
db.inventarios = require("./inventario.model.js")(sequelize, Sequelize);
db.pedidos = require("./pedido.model.js")(sequelize, Sequelize);
db.productos = require("./producto.model.js")(sequelize, Sequelize);
db.proveedores = require("./proveedor.model.js")(sequelize, Sequelize);
db.sucursales = require("./sucursal.model.js")(sequelize, Sequelize);

module.exports = db;