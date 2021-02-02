//Exportaciones de express, modelo, bcrypt ... 
const express = require('express');
const Usuario = require('../models/usuario');

// Se necesita para la validacion de la contraseña encriptada
const bcrypt = require('bcrypt');
// JWT generar tokens para inicio de sesion 
const jwt = require('jsonwebtoken');



//creando instacia de express
const app = express();


app.post('/login', (req, res) => {

    const body = req.body;


    Usuario.findOne({ email: body.email }, (err, usuario) => {

        // error de base de datos
        if (err) {
            return res.json(500, {
                ok: false,
                message: err
            })
        }
        // si el email es invalido
        if (usuario === null) {
            return res.json(400, {
                ok: false,
                message: 'Email o contraseña invalidos'
            })
        }
        // se usa la funcion bcrypt.compareSync que retorna true o false
        if (bcrypt.compareSync(body.password, usuario.password) === false) {
            return res.json(400, {
                ok: false,
                message: 'Email o contraseña invalidos'
            })
        }

        const token = jwt.sign(
            { usuario: usuario },
            process.env.SEED,
            { expiresIn: process.env.CADUCIDAD_TOKEN })
        res.json(200, {
            ok: true,
            Usuario: usuario,
            token,
            message: 'Inicio de sesion exitoso'
        })


    })



})

module.exports = app;