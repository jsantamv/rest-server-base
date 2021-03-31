const { validationResult } = require("express-validator")

/**
 * Middleware que Valida los campos para retornar 
 * un error en caso de que no cumpla con los criterios 
 * @param {request} req request
 * @param {response} res response
 * @param {next} next para que continue con la validacion
 * @returns json con los errores
 */
const validarCampos = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json(errors)
    }
    next() //Continua con el siguiente middleware
}


module.exports = {
    validarCampos
}