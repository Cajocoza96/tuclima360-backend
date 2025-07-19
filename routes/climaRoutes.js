const express = require('express');
const router = express.Router();
const climaService = require('../services/climaService');

// Ruta para obtener el clima por coordenadas
router.get('/clima', async (req, res) => {
    try {
        const { latitude, longitude } = req.query;

        // Validar parámetros
        if (!latitude || !longitude) {
            return res.status(400).json({
                error: 'Se requieren los parámetros latitude y longitude'
            });
        }

        // Validar que sean números válidos
        const lat = parseFloat(latitude);
        const lon = parseFloat(longitude);

        if (isNaN(lat) || isNaN(lon)) {
            return res.status(400).json({
                error: 'Las coordenadas deben ser números válidos'
            });
        }

        // Validar rangos de coordenadas
        if (lat < -90 || lat > 90 || lon < -180 || lon > 180) {
            return res.status(400).json({
                error: 'Las coordenadas están fuera del rango válido'
            });
        }

        // Obtener datos del clima
        const datosClima = await climaService.obtenerClima(lat, lon);

        res.json({
            success: true,
            data: datosClima
        });

    } catch (error) {
        console.error('Error en ruta de clima:', error);
        res.status(500).json({
            error: 'Error interno del servidor al obtener el clima',
            message: error.message
        });
    }
});

module.exports = router;