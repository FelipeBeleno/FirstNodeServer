require('./config/config');

const express = require('express');

const bodyParser = require('body-parser');


const app = express();


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())




app.use(express.static(__dirname + '/public'))

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


app.listen(process.env.PORT, console.log(`escuchando en el puerto: ${process.env.PORT}`))

