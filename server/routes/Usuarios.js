
// exportacion de express
const express = require('express');

//Declarar constante para la encryptacion de las cosas
const bcrypt = require('bcrypt');

// exportacion del modelo que creamos
const Usuario = require('../models/usuario');

//middleware token
const { verificarToken, verificarRole } = require('../middlewares/tokenMiddleware');
// exportar underScore.js
const _ = require('underscore');

//iniciar estancia de express
const app = express();



app.get('/usuario', verificarToken, (req, res) => {

    const usuario = req.usuario;

   
    // desde que registro se quiere ver los datos
    let desde = parseFloat(req.query.desde) || 0
    // cuantos valores se quieren ver por pagina
    let limite = parseFloat(req.query.limite) || 5

    Usuario.find({ estado: true }, 'nombre email')
        .skip(desde)
        .limit(limite)
        .exec((err, usuario) => {
            if (err) {
                return res.json(400, {
                    ok: false,
                    masagge: err
                })
            }
            Usuario.count({ estado: true }, (err, counts) => {
                if (err) {
                    return {
                        ok: false,
                        mesagge: err
                    }
                }
                res.json(200, {
                    ok: true,
                    usuarios: usuario,
                    numRegistros: counts
                })
            })
        })


});


app.post('/usuario', [verificarToken, verificarRole], (req, res) => {
    //req.body permite obtener los valores que trae el formulario
    let body = req.body;

    // con esta instancia se crea los campos que se recibiran en el envio del post
    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role

    });


    //usuario.save guarda los datos en la coleccion que ya anteriormente se especifico.
    //como parametro recibe un callback con el error y la data guardada.
    usuario.save((err, usuarioDB) => {
        if (err) {
            res.json(400, {
                ok: false,
                mensaje: err
            })
        } else {
            res.json(200, {
                ok: true,
                usuario: usuarioDB
            })
        }
    })
});


app.put('/usuario/:id', [verificarToken, verificarRole], (req, res) => {

    const id = req.params.id;

    const body = _.pick(req.body, ['nombre', 'email', 'img']);

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, data) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            body
        })

    });

});
app.delete('/usuario/:id', [verificarToken, verificarRole], (req, res) => {

    let id = req.params.id;

    Usuario.findByIdAndUpdate(id, { estado: false }, (err, usuarioActualizado) => {
        if (err) {
            return res.json(400, {
                ok: false,
                error: {
                    message: err
                }
            })
        }
        if (usuarioActualizado === null) {
            return res.json(400, {
                ok: false,
                message: 'El id no existe'
            })
        }
        res.json(200, {
            ok: true,
            usuarioActualizado
        })
    })


    /* Usuario.findByIdAndUpdate(id, (err, data) => {
        if (err) {
            return res.status(400).json( {
                ok: false,
                message: err
            })
        }
        if (data === null) {
            return res.json(400, {
                ok: false,
                error:{
                    message: 'Usuario no existe'
                }
            })
        }
        res.json(200, {
            ok: true,
            usuarioBorrado: data
        })
    }) */
})

module.exports = app;