// Acceder al archivo .env de forma GLOBAL ('process.env')
require('dotenv').config();
// Importar ExpressJS
const express = require('express');
//Configuración del CORS
const cors = require('cors');
// Importar la configuración de la BD




// Crear el servidor de express
const app = express();

// Configurar del CORS
app.use(cors());

// Lectura y parseo del body
app.use(express.json());

// Coneción a la base de datos




// Directorio publico
app.use(express.static('public'));



// Ruta
app.use('/api/upload', require('./routes/uploads'));




// Controlar el puerto donde se corre el servidor
app.listen(process.env.port || 3000, () => {
    console.log('Server ON. Port: ' + process.env.port);
});



