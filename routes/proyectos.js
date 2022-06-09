const router = require('express').Router();

const Proyecto = require('../models/proyecto');

//peticion que devuelve todos los proyectos
router.get('/', async (req, res) => {
    const proyectos = await Proyecto.find().lean(); //el lean() se usa para que mongoose nos devuelva un objeto simple
    res.render('proyectos/index', { proys: proyectos })
});


router.get('/new', async (req, res) => {
    res.render('proyectos/formulario');
})

router.post('/create', async (req, res) => {
    try {
        const proyecto = await Proyecto.create(req.body);
        res.redirect('/proyectos');
    } catch (err) {
        res.json({ error: err })
    }
})

module.exports = router;