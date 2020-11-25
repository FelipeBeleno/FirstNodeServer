const express = require('express');

const fs = require('fs');

const path = require('path');

const app = express();

const { verificaTokenImg } = require('../middlewares/tokenMiddleware');


app.get('/imagen/:tipo/:img',verificaTokenImg, (req, res) => {
    
  
    let tipo = req.params.tipo;
    let img = req.params.img;

    const pathImagen = path.resolve(__dirname, `../../uploads/${tipo}/${img}`)

    const pathNoImg = path.resolve(__dirname, '../assets/img/no-image.jpg')


    if (fs.existsSync(pathImagen)) {
        return res.sendFile(pathImagen)
    } else {
        res.sendFile(pathNoImg)
    }



})

module.exports = app;