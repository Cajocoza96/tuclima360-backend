const axios = require("axios");
require("dotenv").config();

const GEONAMES_BASE_URL = "http://secure.geonames.org/searchJSON";
const USERNAME = process.env.GEONAMES_USERNAME;

const buscarCiudades = async (req, res) => {
    const { q, maxRows = 30, lang = "en" } = req.query;

    try {
        const response = await axios.get(GEONAMES_BASE_URL, {
            params: {
                q,
                maxRows,
                featureClass: "P",
                username: USERNAME,
                lang
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error("❌ Error al buscar ciudades en GeoNames:", error.message);
        res.status(500).json({ error: "Error al obtener datos de GeoNames" });
    }
};

const buscarCiudadesColombia = async (req, res) => {
    const { q, country = "CO", maxRows= 50, lang= "en" } = req.query;

    try {
        const response = await axios.get(GEONAMES_BASE_URL, {
            params: {
                q,
                country,
                maxRows,
                featureClass: "P", 
                featureCode: "PPLA",
                username: USERNAME,
                lang
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error("❌ Error al buscar ciudades de Colombia en GeoNames:", error.message);
        res.status(500).json({ error: "Error al obtener datos de GeoNames" });
    }
};

module.exports = {
    buscarCiudades,
    buscarCiudadesColombia
};