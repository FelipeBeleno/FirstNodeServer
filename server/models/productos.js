const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productosSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es requerido']
    },
    precioUni: {
        type: Number,
        required: [true, 'El valor es necesario']
    },
    categoria: {
        type: Schema.Types.ObjectId,
        required: false,
        ref: 'Categorias'
    },
    disponible:{
        type: Boolean,
        required: true,
        default: true
    },
    img:{
        type: String,
        required: false
    },
    usuario:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
        
    }

});


module.exports = mongoose.model('Productos', productosSchema)