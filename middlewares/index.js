//UNIFICACION de archivos para las importaciones
//al llamarse index.js, por consiguiente si apunto a la 
//carpeta de middlewares, por default busca index.js

const validarCampos = require('../middlewares/validar-campos')
const validarJWT = require('../middlewares/validar-jwt')
const validaRoles = require('../middlewares/validar-roles')


module.exports = {
    ...validarCampos,
    ...validarJWT,
    ...validaRoles
}