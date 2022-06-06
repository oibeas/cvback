const router = require('express').Router();

// router.get('/proyectos', (req, res) => {
//     res.send('Hola estas dentro de la API');
// });

//Delegamos lo que venga por /proyectos al apirouterProyectos
const apiRouterProyectos = require('./api/proyectos');

router.use('/proyectos', apiRouterProyectos);

module.exports = router;