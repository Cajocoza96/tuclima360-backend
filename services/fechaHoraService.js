const axios = require("axios");

const obtenerFechaHora = async (ciudad, departamento, pais) => {
    try {
        const geoResponse = await axios.get("https://secure.geonames.org/searchJSON", {
            params: {
                q: `${ciudad}, ${departamento}, ${pais}`,
                maxRows: 1,
                username: process.env.GEONAMES_USERNAME,
            },
        });

        const lugar = geoResponse.data.geonames[0];
        if (!lugar) {
            throw new Error("No se encontró la ubicación en GeoNames");
        }

        const { lat, lng } = lugar;

        const timeResponse = await axios.get("https://api.timezonedb.com/v2.1/get-time-zone", {
            params: {
                key: process.env.TIMEZONEDB_KEY,
                format: "json",
                by: "position",
                lat,
                lng,
            },
        });

        const timeData = timeResponse.data;
        const timeString = timeResponse.data.formatted; 
        const date = new Date(timeString.replace(" ", "T"));

        const hora = date.getHours();
        const minutos = date.getMinutes();
        const hora12 = hora % 12 || 12;
        const ampm = hora >= 12 ? "p.m" : "a.m";

        const diasSemana = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const meses = ["January", "February", "March", "April", "May", "June", "July", "August",
            "September", "October", "November", "December"];

        const fechaLarga = `${diasSemana[date.getDay()]}, ${date.getDate()} ${meses[date.getMonth()]}, ${date.getFullYear()}`;

        return {
            hora12: `${hora12}:${minutos.toString().padStart(2, "0")}`,
            ampm,
            fechaLarga,
            hora24: hora, 
            hora24Completa: `${hora.toString().padStart(2, "0")}:${minutos.toString().padStart(2, "0")}`, 
            zoneName: timeData.zoneName || "", 
            abbreviation: timeData.abbreviation || "", 
        };

    } catch (error) {
        console.error("❌ Error en obtenerFechaHora:", error.message);
        throw error;
    }
};

module.exports = { obtenerFechaHora };