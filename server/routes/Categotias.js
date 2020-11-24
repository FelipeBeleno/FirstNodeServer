const express = require('express');

const { verificarToken, verificarRole } = require('../middlewares/tokenMiddleware');

const _ = require('underscore');

const app = express();

const Categoria = require('../models/categorias');
const { json } = require('body-parser');

// consutar todos los registros
app.get('/categoria', verificarToken, (req, res) => {

    

    Categoria.find({})
                .sort('nombre')
                .populate('usuario','nombre email')
                .exec((err, categorias) => {
                    if (err) {
                        return res.json(400, {
                            ok: false,
                            error: {
                                message: err
                            }
                        })
                    }
                    Categoria.count((err, counts)=>{
                        if (err) {
                            return res.json(500, {
                                ok: false,
                                error: err

                            })
                        }
                        res.json(200, {
                            ok: true,
                            categorias,
                            numCategorias: counts
                        })
                

                    })
                   
                })
});


// consultar un registro en especial
app.get('/categoria/:id', (req, res) => {
    const id = req.params.id

});


//Crear un registro en especifico
app.post('/categoria', verificarToken, (req, res) => {

    const body = req.body;

    const categoria = new Categoria({

        nombre: body.nombre,
        descripcion: body.descripcion,
        usuario: req.usuario._id
    })

    categoria.save((err, nuevaCategoria) => {
        if (err) {
            return res.json(400, {
                ok: false,
                error: {
                    message: err
                }
            })
        }

        res.json(200, {
            ok: true,
            categoria: nuevaCategoria
        })
    })


})


// actualizacion del registro
app.put('/categoria/:id', verificarToken, (req, res) => {

    const id = req.params.id

    const body = _.pick(req.body, ['nombre', 'descripcion', 'usuario']);


    Categoria.findByIdAndUpdate(id, body, { new: true, context: 'query' }, (err, categoria) => {
        if (err) {
            return res.json(400, {
                ok: false,
                error: err,
                //message:"err"
            })
        }
        
        res.json(200, {
            ok: true,
            categoria
        })


    })
})


//Eliminar un registro solo ADMIN_USER

app.delete('/categoria/:id', [verificarToken, verificarRole], (req, res) => {
    const id = req.params.id;

    Categoria.findByIdAndDelete(id, (err, categoriaEliminada) => {
        if (err) {
            return res.json(400, {

                ok: false,
                error: err

            })
        }

        res.json({
            ok: true,
            message: 'Categoria Eliminada',
            categoriaEliminada
        })
    })
})



module.exports = app;