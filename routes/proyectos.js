const router = require('express').Router();
const multer = require('multer'); //Para la gestion de los archivos de imagenes
const upload = multer({ dest: 'public/images' });
const fs = require('fs');

const Proyecto = require('../models/proyecto');

//peticion que devuelve todos los proyectos
router.get('/', async (req, res) => {
    const proyectos = await Proyecto.find().lean(); //el lean() se usa para que mongoose nos devuelva un objeto simple
    res.render('proyectos/index', { proys: proyectos })
});


router.get('/new', async (req, res) => {
    // let fullUrl = req.protocol + '://' + req.get('host');
    // console.log(fullUrl);
    res.render('proyectos/formulario');
})

//Formulario de edicion
router.get('/edit/:proyectoId', async (req, res) => {
    const proyecto = await Proyecto.findById(req.params.proyectoId).lean()
    res.render('proyectos/formEdit', { proy: proyecto })
})


//Enviar formulario
router.post('/create', upload.single('imagen'), async (req, res) => {
    //!GESTIONAR LA IMAGEN
    console.log(req.file);
    const finalPath = req.file.destination + '/' + req.file.filename + '.' + mimeTypeExtension(req.file.mimetype)
    fs.renameSync(req.file.path, finalPath);

    req.body.imagen = finalPath;

    try {
        const proyecto = await Proyecto.create(req.body);
        res.redirect('/proyectos');
    } catch (err) {
        res.json({ error: err })
    }
})

//Actualizar formulario
router.post('/update', upload.single('imagen'), async (req, res) => {
    const finalPath = req.file.destination + '/' + req.file.filename + '.' + mimeTypeExtension(req.file.mimetype)
    fs.renameSync(req.file.path, finalPath);

    req.body.imagen = finalPath;
    try {
        await Proyecto.findByIdAndUpdate(req.body.proyectoId, req.body)
        res.redirect('/proyectos');
    } catch (err) {
        res.json({ error: err })
    }
})



function mimeTypeExtension(mimeType) {
    return mimeType.split('/')[1];
}

module.exports = router;