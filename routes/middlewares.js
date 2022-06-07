const jwt = require('jwt-simple');
const moment = require('moment');

//Creamos una funcion que mire si en las peticiones viene una cabecera con el token que he creado, y comprobar si el token no esta caducado
exports.checkToken = (req, res, next) => {
    //1º comprobar si estan las cabeceras
    if (!req.headers['access-token']) {
        return res.status(403).json({ error: 'Debes incluir la cabecera access-token' });
    }

    const token = req.headers['access-token'];

    //2ºIntento descodificarlo
    let payload = null;
    try {
        payload = jwt.decode(token, process.env.SECRET_KEY);
    } catch (err) {
        //Si llego aqui es que el token esta mal
        return res.status(403).json({ error: 'El token incluido es incorrecto' });
    }

    //3ºComprobamos la fecha de expiracion
    if (payload.expiredAt < moment().unix()) {
        return res.status(403).json({ error: 'El token ha expirado' });
    }

    if (payload.usuario !== 'Oibeas') {
        return res.status(403).json({ error: 'El usuario es incorrecto' });
    }

    //Para asegurarnos de tener el payload
    req.payload = payload;

    next();
}
