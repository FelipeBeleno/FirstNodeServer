

const jwt = require('jsonwebtoken');

// funcion que recibe requerimientos de la pagina, respuesta y next
const verificarToken = (req, res, next) => {
    // de esta manera se puede obtener los headers que se envian
    const token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, usuario) => {
        if (err) {
            return res.json({
                ok: false,
                err
            })
        }

        req.usuario = usuario.usuario
        //console.log(usuario);

        next();
    })



}


const verificarRole = (req, res, next) => {

    const usuario = req.usuario;

    if (usuario.role === "ADMIN_ROLE") {
        next()
    } else {
        return res.json({
            message: 'Rol no permitido a esta instancia'
        })
    }

}

//verificar token con img
const verificaTokenImg = (req, res, next) => {
    const token = req.query.token

    jwt.verify(token, process.env.SEED, (err, usuario) => {
        if (err) {
            return res.json({
                ok: false,
                err
            })
        }

        req.usuario = usuario.usuario
        //console.log(usuario);

        next();
    })
}

module.exports = {
    verificarToken,
    verificarRole,
    verificaTokenImg
}