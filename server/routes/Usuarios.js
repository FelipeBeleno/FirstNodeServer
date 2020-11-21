
const express = require('express');

const app = express();

app.get('/usuario', (req, res) => {

    const usuarios = [
        {
            nombre: 'felipe',
            edad: 26,
            hijos: true
        },
        {
            nombre: 'Juan',
            edad: 1,
            hijos: false
        },
        {
            message: 'LOCAL !!!'
        }
    ]

    res.json(200, usuarios);

});


app.post('/post', (req, res) => {


    let body = req.body;

    if (body.nombre === undefined) {

        res.status(402).json({
            ok: false,
            error: 'Ingrese un nombre'
        })

    } else {

        res.json(200, {
            body
        })

    }


});
app.put('/put/:id', (req, res) => {


    const id = req.params.id
    res.send(200, {
        id,
        nombre: 'Felipe'
    })
});
app.delete('/delete', (req, res) => {
    res.send(200, 'delete')
})

module.exports = app ;