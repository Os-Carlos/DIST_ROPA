const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./app/models");

const app = express();
const PORT = process.env.PORT || 4000;

var corsOptions = {
    origin: [
        "http://localhost:3000"
    ]
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

db.sequelize.sync()
    .then(() => {
        console.log("------Base de datos sincronizada");
    })
    .catch((err) => {
        console.log("------Error al sincronizar la base de datos: " + err.message);
    });

app.get("/", (req, res) => {
    res.json({ message: "API Desarrollo Web" });
});
require("./app/routes/cliente.routes")(app);
require("./app/routes/compra_detalle.routes")(app);
require("./app/routes/compra.routes")(app);
require("./app/routes/departamento.routes")(app);
require("./app/routes/direccion.routes")(app);
require("./app/routes/empleado.routes")(app);
require("./app/routes/factura_detalle.routes")(app);
require("./app/routes/factura.routes")(app);
require("./app/routes/inventario.routes")(app);
require("./app/routes/municipio.routes")(app);
require("./app/routes/pedido.routes")(app);
require("./app/routes/producto.routes")(app);
require("./app/routes/proveedor.routes")(app);
require("./app/routes/sucursal.routes")(app);
require("./app/routes/telefono.routes")(app);
require("./app/routes/usuario.routes")(app);

app.listen(PORT, () => {
    console.log(`------Servidor corriendo en puerto: ${PORT}.`);
});