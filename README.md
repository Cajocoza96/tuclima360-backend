Nombre del proyecto: TuClima360

TuClima360 es una aplicación web para consultar el clima en tiempo real.

Características:
Búsqueda de ciudades, datos climáticos en tiempo real, gráficas dinámicas, opciones de personalización y diseño responsivo.

Tecnologías Utilizadas:

Frotend:
React 19 + Vite, axios, chart.js, framer-motion, lottie-react, lucide-react, luxon, react-dom, react-icons, react-router-dom, swiper, tailwindcss, @tailwindcss/vite

Backend:
Node.js, Express, Axios, cors, dotenv

Prerrequisitos:
Antes de ejecutar este proyecto, asegúrate de tener instalado: 
1. Un navegador actualizado (preferiblemente Google Chrome).
2. [Node.js](https://nodejs.org/) (versión recomendada LTS).

Instalación:
1. Clona los repositorios:

Para el frotend:
git clone https://github.com/Cajocoza96/tuclima360-frontend.git  

Para el backend:
git clone https://github.com/Cajocoza96/tuclima360-backend.git

2. Navega al directorio del proyecto e instala las dependencias:

Puedes primero hacer lo del Frotend o lo del backend

Para el Frotend:
Navega al directorio: 
cd tuclima360-frontend

Instala las dependencias:
npm install

Para el Backend:
Navega al directorio:
cd tuclima360-backend

Instala las dependencias:
npm install 

3. Configuraciones importantes en Frotend y Backend:

Frotend:
En la raiz del proyecto debes crear un archivo .env y colocar ahi adentro la siguiente variable:
VITE_API_URL=http://localhost:5000 

Puede ser tambien otro nombre para la variable u otro puesto en donde quieras comunicar con el Frotend de forma local.

Debes buscar los archivos BusquedaContext.jsx, ClimaContext.jsx y FechaHoraContext.jsx en caso de que cambiastes el nombre de la variable asegurarte de reemplazar en cada uno de ellos VITE_API_URL por el nombre de la variable que colocastes, en caso de seguir siendo la misma es decir VITE_API_URL no hacer nada.

Backend:
En la raiz del proyecto debes crear un archivo .env y colocar ahi adentro las siguiente variable:

1. Nombre de usuario de la API de Geonames
GEONAMES_USERNAME:nombre_de_usuario de Geonames

Debes buscar el archivo geonamesController.js y asegurarte de reemplazar GEONAMES_USERNAME por el nombre de la variable que colocastes, en caso de seguir siendo la misma es decir GEONAMES_USERNAME no hacer nada.

2. Api Key de la API de timezoneDb
TIMEZONEDB_KEY=api_key_de_timezonedb

Debes buscar el archivo fechaHoraService.js y asegurarte de reemplazar TIMEZONEDB_KEY por el nombre de la variable que colocastes, en caso de seguir siendo la misma es decir TIMEZONEDB_KEY no hacer nada.

3. Variables para app.js
PORT=5000 
ALLOWED_ORIGINS=http://localhost:5173

Debes buscar el archivo app.js y asegurarte de reemplazar PORT por el nombre de la variable que colocastes, en caso de seguir siendo la misma es decir PORT no hacer nada.

Debes buscar el archivo app.js y asegurarte de reemplazar ALLOWED_ORIGINS por el nombre de la variable que colocastes, en caso de seguir siendo la misma es decir ALLOWED_ORIGINS no hacer nada.

PORT es el puerto donde vas levantar el backend de manera local y ALLOWED_ORIGINS son los origenes permitidos.

4. Ejecuta el proyecto:

Debes levantar backend y frotend

Para el backend coloca:
npm run dev

Para el Frotend coloca:
npm run dev

Esto levantará el backend y frotend por defecto en el navegador en el puerto que tengas 

