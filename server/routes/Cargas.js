const express = require('express');
const fileUpload = require('express-fileupload');


const Usuario = require('../models/usuario');
const Productos = require('../models/productos');
const usuario = require('../models/usuario');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(fileUpload({ useTempFiles: true }));


app.put('/upload/:tipo/:id', (req, res) => {

    const tipo = req.params.tipo;
    const id = req.params.id;


    if (!req.files) {
        return res.json(400, {
            ok: false,
            menssage: 'No hay ningun archivo subido'
        });
    }

    const tipos = ['usuarios', 'productos']

    const resultadoTipos = tipos.find(res => {



        return res === tipo

    })

    //console.log(resultadoTipos);


    if (resultadoTipos === undefined) {
        return res.json(400, {
            ok: false,
            error: {
                message: `El tipo de dato ingresado es invalido, los tipos validos son: ${tipos}`
            }
        })
    }


    const archivo = req.files.archivo;

    const nombreArchivo = archivo.name.split('.')

    const extencion = nombreArchivo[nombreArchivo.length - 1];


    // Extenciones validas
    const extenciones = ['png', 'jpg', 'gif', 'jpeg']

    const validacionExt = extenciones.find(respuesta => {
        if (respuesta === extencion) {

            respuesta = true

            return respuesta;
        }
        else {

            return false;
        }
    })


    if (validacionExt === undefined) {
        return res.json(400, {
            ok: false,
            error: {
                message: `Extenciones invalidas, las extenciones validas son: ${extenciones}`,
                extIngresada: `.${extencion}`
            }
        })
    }

    const nombreArchivoFinal = `${id + new Date().getMilliseconds() + '.' + extencion}`


    archivo.mv(`./uploads/${tipo}/${nombreArchivoFinal}`, (err) => {
        if (err)
            return res.json(400, {
                ok: false,
                error: err
            })

        // actualizacion de imagenes
        if (tipo === 'usuarios') {
            imagenUsuario(id, res, nombreArchivoFinal);
        } else if (tipo === 'productos') {
            imagenProducto(id, res, nombreArchivoFinal);
        }

    })

})


const imagenProducto = (id, res, nombreArchivoFinal) => {


    Productos.findById(id, (err, productoDB) => {
        if (err) {
            eliminarImagen(nombreArchivoFinal, 'productos')

            return res.json(500, {
                ok: false,
                error: err
            })
        }

        if (!productoDB) {

            eliminarImagen(nombreArchivoFinal, 'productos')

            return res.json(400, {
                ok: false,
                error: err
            })
        }
        //borrar imagen cargada previamente
        eliminarImagen(productoDB.img, 'productos')
        productoDB.img = nombreArchivoFinal;

        productoDB.save((err, productoDB) => {
            if (err) {
                return res.json(400, { ok: false, error: err })
            }
            res.json({
                ok: true,
                Producto: productoDB,
                img: productoDB.img
            })
        })
    })
}

const imagenUsuario = (id, res, nombreArchivoFinal) => {


    Usuario.findById(id, (err, usuario) => {
        if (err) {

            eliminarImagen(nombreArchivoFinal, 'usuarios')
            return res.json(500, {
                ok: false,
                error: err
            })
        }

        if (!usuario) {

            eliminarImagen(nombreArchivoFinal, 'usuarios')
            return res.json(400, {
                ok: false,
                error: err
            })
        }

        eliminarImagen(usuario.img, 'usuarios')


        usuario.img = nombreArchivoFinal

        usuario.save((err, usuarioActualizado) => {
            if (err) {
                return res.json(400,
                    {
                        ok: false,
                        error: err
                    });
            }

            res.json({
                ok: true,
                usuario: usuarioActualizado
            })
        })
    })
}

const eliminarImagen = (nombreImagen, tipo) => {
    let pathURL = path.resolve(__dirname, `../../uploads/${tipo}/${nombreImagen}`);


    if (fs.existsSync(pathURL)) {
        fs.unlinkSync(pathURL);
        console.log('imagen borrada');
    }
}

module.exports = app;