const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const geonamesRoutes = require("./routes/geonamesRoutes");
const climaRoutes = require('./routes/climaRoutes');
const fechaHoraRoutes = require("./routes/fechaHoraRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
const allowedOrigins = process.env.ALLOWED_ORIGINS.split(",");
app.use(cors({
    origin: allowedOrigins
}));
app.use(express.json());

// Rutas
app.use("/api/timezonedb", fechaHoraRoutes);
app.use("/api/geonames", geonamesRoutes);
app.use("/api/openmeteo", climaRoutes);

// Ruta raíz opcional para verificar que el servidor funcione
app.get("/", (req, res) => {
    res.send("🌐 Backend de geonames, openmeteo y timezonedb funcionando");
});


// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor backend escuchando en http://localhost:${PORT}`);
});

module.exports = app;
