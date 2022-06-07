const router = require('express').Router();
const { check, validationResult } = require('express-validator');

const Proyecto = require('../../models/proyecto');

//al llegar a /api/proyectos hacemos esto:
//Es una promesa y la gestionamos con async/await y try/catch
router.get('/', async (req, res) => {
    console.log(req.payload);
    try {
        const proyectos = await Proyecto.find();
        res.json(proyectos);
    } catch (err) {
        res.status(503).json({ 'error': err });
    }
});

//recuperamos los proyectos por categoria
router.get('/:categoria', async (req, res) => {
    try {
        const proyectos = await Proyecto.find({ categoria: req.params.categoria })
        res.json(proyectos);
    } catch (err) {
        res.status(503).json({ 'error': err });
    }
})



//peticion POST
router.post('/', [ //aqui van las validaciones
    check('titulo', 'El titulo debe incluirse en la peticion y tiene un maximo de 40 caracteres')
        .exists()
        .notEmpty()
        .isLength({ max: 40 }),
    check('descripcion', 'La descripcion debe incluirse en la peticion y tiene un maximo de 300 caracteres')
        .exists()
        .notEmpty()
        .isLength({ max: 300 }),
    check('url', 'La url del proyecto debe estar correcta')
        .isURL()
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    //si pasa as validaciones y no hay error lo mete en la base de datos
    try {
        const nuevoProyecto = await Proyecto.create(req.body)
        res.json(nuevoProyecto);
    } catch (err) {
        res.status(503).json({ 'error': err });
    }
});


//peticion put
router.put('/:proyectoId', async (req, res) => {
    try {
        //primero recuperamos la id del proyecto, me viene en la url y lo recupero con el params
        const proyectoEditado = await Proyecto.findByIdAndUpdate(req.params.proyectoId, req.body, { new: true });
        res.json(proyectoEditado)
    } catch (err) {
        res.status(503).json({ 'error': err });
    }
});

//peticion delete
router.delete('/:proyectoId', async (req, res) => {
    try {
        //primero recuperamos la id del proyecto, me viene en la url y lo recupero con el params
        const proyectoBorrado = await Proyecto.findByIdAndDelete(req.params.proyectoId);
        console.log(proyectoBorrado);
    } catch (err) {
        res.status(503).json({ 'error': err });
    }
});

module.exports = router;