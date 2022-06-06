const router = require('express').Router();

const Proyecto = require('../../models/proyecto');

//al llegar a /api/proyectos hacemos esto:
//Es una promesa y la gestionamos con then/catch
router.get('/', (req, res) => {
    let proyecto = new Proyecto();
    proyecto.titulo = 'Proyecto de prueba';
    proyecto.save()
        .then((p) => {
            console.log(p);
        })
        .catch(err => {
            console.log(err);
        })
    res.send('Estoy ya donde tengo que estar');
});


module.exports = router;