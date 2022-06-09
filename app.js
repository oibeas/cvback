const express = require('express');
const cors = require('cors');
const { engine } = require("express-handlebars");
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
const proyectosRouter = require('./routes/proyectos');

// Template Engine Setup: Handelbars
app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', './views');


app.use(express.static('public')); //servicio de archivos estaticos
app.use(cors()); //para que no de problemas el navegador con las cors
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Creamos nuevas rutas
app.use('/api', apiRouter);
app.use('/proyectos', proyectosRouter);


//sacamos la variable PORT del archivo .env
const PORT = process.env.PORT || 3333;
//Ponemos el puerto a escuchar
app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}!!!`);
});

