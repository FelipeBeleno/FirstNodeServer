// importacion de express
const express = require('express');
//importacion del modelo
const Producto = require('../models/productos');
//middleware para tokens y validacion de usuarios
const { verificarToken, verificarRole } = require('../middlewares/tokenMiddleware');

const app = express();

//consulta de todos los productos
app.get('/productos', verificarToken, (req, res) => {

    const limite = parseFloat(req.query.limit) || 5
    const desde = parseFloat(req.query.limit) || 0



    Producto.find({ disponible: true })
        .populate('usuario', 'nombre email')
        .populate('categoria', 'nombre descripcion')
        .limit(limite)
        .skip(desde)
        .exec((err, producto) => {
            if (err) {
                res.json(400, {
                    ok: false,
                    error: err
                })
            }
            Producto.count({ disponible: true }, (err, totalRegistros) => {
                if (err) {
                    return res.json(400, {
                        ok: false,
                        error: err
                    })
                }
                res.json({
                    ok: true,
                    productos: producto,
                    totalRegistros
                })
            })

        })
})

//consulta de producto por id
app.get('/productos/:id', verificarToken, (req, res) => {

    const id = req.params.id;

    Producto.findById(id, (err, Producto) => {
        if (err) {
            return res.json(400, {
                ok: false,
                error: err
            })
        }
        if (Producto === null) {
            return res.json({
                ok: false,
                error: 'Id ingresado no es valido'
            })
        }

        res.json({
            ok: true,
            Producto
        })

    }).populate('usuario', 'nombre email').populate('categoria', 'nombre descripcion')
});

// Busqueda por nombre
app.get('/productos/buscar/:termino',verificarToken, (req, res) => {

    const termino = req.params.termino;

    const exprReg = new RegExp(termino, 'i');

    Producto.find({nombre: exprReg, disponible: true})
    .populate('categoria', 'nombre')
    .exec((err, productos)=>{

        if (err) {
            return res.json(400, {
                ok:false,
                error: err
            })
        }

        if(productos === null){
            return res.json(400,{
                ok:false,
                message: 'carater invalido'
            })
        }

        res.json({
            ok:true,
            productos
        })
    })
})

//creacion de los productos
app.post('/productos', verificarToken, (req, res) => {


    const body = req.body;

    const producto = new Producto({
        nombre: body.nombre,
        precioUni: body.precioUni,
        disponible: body.disponible,
        categoria: body.categoria,
        usuario: req.usuario
    });


    producto.save((err, nuevoProducto) => {
        if (err) {

            return res.json({
                ok: false,
                error: err
            })
        }

        res.json(200, {
            ok: true,
            producto: nuevoProducto
        })

    })

});

//actualizacion de los productos
app.put('/productos/:id', verificarToken, (req, res) => {

    const id = req.params.id;

    let body = req.body;

    const dataUpdate = {

        nombre: body.nombre,
        precioUni: body.precioUni,
        categoria: body.categoria,
        usuario: req.usuario

    }

    Producto.findByIdAndUpdate(id, dataUpdate, { new: true, context: 'query' }, (err, categoriaActualizada) => {
        if (err) {
            return res.json(500, {
                ok: false,
                error: err
            })
        }
        if (categoriaActualizada === null) {
            return res.json({
                ok: false,
                error: 'Id ingresado no es valido'
            })
        }

        res.json(200, {
            ok: true,
            categoria: categoriaActualizada
        })
    })

});

//Eliminar o cambiar de estado del producot
app.delete('/productos/:id', verificarToken, (req, res) => {

    const id = req.params.id;

    Producto.findByIdAndUpdate(id, { disponible: false }, { new: true, context: 'query' }, (err, productoEliminado) => {
        if (err) {
            return res.json(400, {
                ok: false,
                error: err
            })
        }
        if (productoEliminado === null) {
            return res.json(400, {
                ok: false,
                message: 'El id ingresado no es valido'
            })
        }
        res.json(200, {
            ok: true,
            message: 'El registro ha sido elimano exitosamente',
            registroEliminado: productoEliminado
        })
    })
})





module.exports = app;