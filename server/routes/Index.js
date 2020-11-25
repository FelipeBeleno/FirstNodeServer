const express = require("express");

const app = express();



app.use(require('./Login'));
app.use(require('./Usuarios'));
app.use(require('./Categotias'));
app.use(require('./Productos'));
app.use(require('./Cargas'));
app.use(require('./Imagenes'));

app.get('/',(req, res)=>{
    res.json({
        ok: true,
        message: 'BackEnd Listo para uso'
    })
})





module.exports = app;