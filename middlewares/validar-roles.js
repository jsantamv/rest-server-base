const { response } = require("express")


/**
 * Valida si el role es administrador para que 
 * pueda eliminar un usuario. 
 * @param {request} req del usario auntenticado
 * @param {response} res resultado de validacion
 * @param {next} next callback para continuar
 * @returns 
 */
const esAdminRole = (req, res = response, next) => {

    //validamos undefined
    if (!req.usuario) {
        return res.status(500).json({
            msg: 'Se quiere verificar el rol sin validar el token primero'
        })
    }

    const { rol, nombre } = req.usuario

    if (rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${nombre}: No es administrador -  No cuenta con permisos`
        })
    }

    next()
}


//operador rest '...'
/**
 * Valida cuales roles estan autorizados para 
 * realizar operaciones donde se llame
 * @param  {...any} roles el arreglo de roles autorizados
 * @returns 
 */
const tieneRole = (...roles) => {
    //se utiliza la misma funcion
    return (req, res = response, next) => {

        //validamos undefined
        if (!req.usuario) {
            return res.status(500).json({
                msg: 'Se quiere verificar el rol sin validar el token primero'
            })
        }

        //Validamos roles validos
        if (!roles.includes(req.usuario.rol)) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos ROLES ${roles}`
            })
        }
        
        next()
    }
}


module.exports = {
    esAdminRole,
    tieneRole
}