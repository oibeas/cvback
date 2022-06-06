const express = require('express');
const app = express();

//Importamos el dotenv para los datos del puerto
require('dotenv').config();
require('./db');

//Creamos la ruta de inicio
// app.get('/', (req, res) => {
//     res.send('Hola Servidor bonito!!!!!');
// });

//requerimos el archivo api dentro de la carpeta routes para manejar estas rutas
const apiRouter = require('./routes/api')

//Creamos nuevas rutas
app.use('/api', apiRouter);


//sacamos la variable PORT del archivo .env
const PORT = process.env.PORT || 3333;
//Ponemos el puerto a escuchar
app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}!!!`);
});

