const express = require("express");
const router = express.Router();
const { getFechaHora } = require("../controllers/fechaHoraController");

// Ruta GET para obtener fecha y hora basándose en ciudad, departamento y país
router.get("/fecha-hora", getFechaHora);

module.exports = router;