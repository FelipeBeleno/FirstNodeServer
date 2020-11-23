require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use( require('./routes/Usuarios'))


app.use(express.static(__dirname + '/public'))



mongoose.connect(process.env.URLDB, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
}, (err) => {
    if (err) {
        throw err;

    }
    console.log('Base de Datos online');

});


app.listen(process.env.PORT, console.log(`escuchando en el puerto: ${process.env.PORT}`))

