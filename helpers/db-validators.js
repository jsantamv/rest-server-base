const Role = require("../models/role")
const Usuario = require("../models/users")

/**
 * validar si el rol existe en la base de datos
 * o no esta vacio. 
 * @param {Rol} rol a validar
 */
const validRole = async (rol = '') => {
    const rolExist = await Role.findOne({ rol })
    if (!rolExist) {
        throw new Error(`Rol: ${rol} no es valido`)
    }
}


/**
 * Valida si el correo ya existe
 * @param {correo} correo a validar
 */
const emailExist = async (correo = '') => {
    const emailExist = await Usuario.findOne({ correo })
    if (emailExist) {
        throw new Error(`El correo: ${correo} ya existe`)
    }
}


const userExistById = async (id = '') => {
    const userExist = await Usuario.findById(id)
    if (!userExist) {
        throw new Error(`El id usuario: ${id} no existe`)
    }
}

module.exports = {
    validRole,
    emailExist,
    userExistById
}
