//Creacion de la instancia mongoose para el esquema del modelo
const mongoose = require('mongoose');
// Validacion de los campos iguales, con mensajes para la identificacion de error en el front end
const validator = require('mongoose-unique-validator');



//Asignacion de los valores validos para un campo en la coleccion.
const rolesValidos = {
    values: ['USER_ROLE', 'ADMIN_ROLE'],
    message: '{VALUE} no es un rol valido'
}

// intancia de esquema
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
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    },
    estado: {
        type: Boolean,
        required: true,
        default: true
    },
    google: {
        type: Boolean,
        required: true,
        default: false
    }
});

// por medio de los plugins se puede añadir funcionalidades al esquema.
usuarioSchema.plugin( validator ,{message: '{PATH} debe de ser unico'})
//Modificacion de retorno, quitando la contraseña que se imprime al usuario Json:
usuarioSchema.methods.toJSON = function () {
    // user ahora tiene el valor que hay actualmente en el objeto
    let user = this;
    //recuperar el objeto que tiene el usuario en ese momento
    let objUser = user.toObject();

    delete objUser.password;

    return objUser;

}

//Exporta el modelo.
module.exports = mongoose.model( 'Usuario', usuarioSchema )