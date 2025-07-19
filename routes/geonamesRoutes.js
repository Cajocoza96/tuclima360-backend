const express = require("express");
const router = express.Router();
const { buscarCiudades } = require("../controllers/geonamesController");
const { buscarCiudadesColombia } = require("../controllers/geonamesController");

router.get("/busqueda", buscarCiudades);
router.get("/busqueda-colombia", buscarCiudadesColombia);

module.exports = router;