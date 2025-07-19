const { obtenerFechaHora } = require("../services/fechaHoraService");

const getFechaHora = async (req, res) => {
    const { ciudad, departamento, pais } = req.query;

    if (!ciudad || !departamento || !pais) {
        return res.status(400).json({
            error: "Faltan parámetros requeridos: ciudad, departamento, pais"
        });
    }

    try {
        const datos = await obtenerFechaHora(ciudad, departamento, pais);
        res.json(datos);
    } catch (error) {
        console.error('❌ Error en el controlador fechaHora:', error.message);
        res.status(500).json({ error: "Error al obtener fecha y hora" });
    }

};

module.exports = { getFechaHora };