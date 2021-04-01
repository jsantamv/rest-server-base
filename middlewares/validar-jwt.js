require('colors')
const { response } = require('express')
const jwt = require('jsonwebtoken')
const Usuario = require('../models/users')


/**
 * Valida el Token del usuario
 * que esta logueado.
 * @param {request} req 
 * @param {response} res 
 * @param {next} next 
 * @returns 
 */
const validarJWT = async (req, res = response, next) => {

    //aca colocamos x-token
    //pero puede ser otro nombre
    //queda a discricion del desarrollador
    //esto va en el header del postman
    const token = req.header('x-token')

    //Valido que envien el TOKEN
    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        })
    }

    //Valido que sean un token valido, DEL USUARIO logueado
    try {

        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY)

        //Leemos el usuario que modifica uid
        const usuario = await Usuario.findById(uid)

        if (!usuario) {
            return res.status(401).json({
                msg: 'Token no valido - usuario no existe en DB'
            })
        }

        //Verificar si el uid tiene estado en true
        if (!usuario.estado === true) {
            return res.status(401).json({
                msg: 'Token no valido - usuario estado false'
            })
        }

        //Cargo el Request para mantener los datos del usuario 
        // autenticado.
        req.usuario = usuario
        next()
    } catch (error) {
        console.warn('ADVERTENCIA con el TOKEN',`${error}`.bgRed)
        res.status(401).json({
            msg: 'Token no valido'
        })
    }
}



module.exports = {
    validarJWT
}