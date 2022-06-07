const router = require('express').Router();
const moment = require('moment');
const jwt = require('jwt-simple');

// router.get('/proyectos', (req, res) => {
//     res.send('Hola estas dentro de la API');
// });

//Delegamos lo que venga por /proyectos al apirouterProyectos
const apiRouterProyectos = require('./api/proyectos');
const middlewares = require('./middlewares'); //cargamos los middlewares antes de usarlos

router.use('/proyectos', middlewares.checkToken, apiRouterProyectos); //Si el middleware comprueba que esta todo bien , pasa

//Para recuperar el token
router.get('/token', (req, res) => {
    //payload es el objeto para guardar el token
    let payload = {
        usuario: 'Oibeas',
        createdAt: moment().unix(),
        expiredAt: moment().add(15, 'minutes').unix()
    };
    //Ahora lo encriptamos
    const token = jwt.encode(payload, process.env.SECRET_KEY);
    console.log(token);
    res.json({ token });
});



module.exports = router;