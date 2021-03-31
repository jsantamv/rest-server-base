const { Schema, model } = require('mongoose')


const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'El password es obligatorio']
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        required: true,
        enum: []
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
})

//Sobreescribimos el metodo de toJSON
UsuarioSchema.methods.toJSON = function () {
    const { __v, password, ..._user } = this.toObject()
    return _user
}

//me define el Modelo, y el Schema
module.exports = model('User', UsuarioSchema)