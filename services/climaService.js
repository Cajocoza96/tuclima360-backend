const axios = require('axios');

class ClimaService {
    constructor() {
        this.baseURL = 'https://api.open-meteo.com/v1/forecast';
    }

    async obtenerClima(latitude, longitude) {
        try {
            const response = await axios.get(this.baseURL, {
                params: {
                    latitude,
                    longitude,
                    hourly: 'temperature_2m,weathercode,precipitation_probability,relativehumidity_2m,uv_index,windspeed_10m,winddirection_10m',
                    daily: 'weathercode,precipitation_probability_max,precipitation_probability_min,temperature_2m_max,temperature_2m_min,uv_index_max', 
                    current_weather: true,
                    temperature_unit: 'celsius',
                    timezone: 'auto',
                }
            });

            return this.procesarDatosClima(response.data);
        } catch (error) {
            console.error('Error al obtener clima de Open-Meteo:', error);
            throw new Error('No se pudo obtener información del clima');
        }
    }

    procesarDatosClima(data) {
        const climaActual = data.current_weather;
        const zonaHoraria = data.timezone;
        
        const horaIndex = data.hourly.time.findIndex(hora => 
            hora.startsWith(climaActual.time.slice(0, 13))
        );
        
        if (horaIndex === -1) {
            throw new Error('No se pudo encontrar el índice de hora actual');
        }

        // Procesar pronóstico de 12 horas
        const pronostico12Horas = [];
        for (let i = 1; i <= 12; i++) {
            const index = horaIndex + i;
            if (index < data.hourly.time.length) {
                pronostico12Horas.push({
                    hora: data.hourly.time[index],
                    temperatura: data.hourly.temperature_2m[index],
                    codigoClima: data.hourly.weathercode[index],
                    probabilidad: data.hourly.precipitation_probability[index],
                    humedad: data.hourly.relativehumidity_2m[index] || 0,
                    viento: {
                        velocidad: data.hourly.windspeed_10m[index] || 0,
                        direccion: data.hourly.winddirection_10m[index] || 0
                    },
                    uv: data.hourly.uv_index[index] || 0
                });
            }
        }

        // Datos del clima actual
        const climaActualProcesado = {
            temperatura: climaActual.temperature,
            codigoClima: climaActual.weathercode,
            tiempo: climaActual.time,
            zonaHoraria,
            humedad: data.hourly.relativehumidity_2m[horaIndex] || 0,
            viento: {
                velocidad: data.hourly.windspeed_10m[horaIndex] || 0,
                direccion: data.hourly.winddirection_10m[horaIndex] || 0
            },
            uv: data.hourly.uv_index[horaIndex] || 0
        };

        // Pronóstico diario
        const pronosticoDelDia = data.daily.time.map((fecha, index) => ({
            fecha,
            weathercode: data.daily.weathercode[index],
            probabilidadMax: data.daily.precipitation_probability_max[index],
            probabilidadMin: data.daily.precipitation_probability_min[index],
            temperaturaMax: data.daily.temperature_2m_max[index],
            temperaturaMin: data.daily.temperature_2m_min[index],
            uvMax: data.daily.uv_index_max[index]
        }));

        return {
            clima: climaActualProcesado,
            pronosticoHora: pronostico12Horas,
            pronosticoDiario: pronosticoDelDia
        };
    }
}

module.exports = new ClimaService();