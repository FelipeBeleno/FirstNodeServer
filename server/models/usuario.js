const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El campo nombre es requerido']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'EL email es necesario']
    },
    password: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: false
    },
    role: {

        default: 'USER_ROLE',

    },
    estado: {
        type: Boolean,
        required: true,
        default: true
    },
    google: {
        type: Boolean,
        required: true,
        default: true
    }
});

module.exports = mongoose.model( 'Usuario', usuarioSchema )