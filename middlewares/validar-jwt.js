require('colors')
const { response } = require('express')
const jwt = require('jsonwebtoken')
const Usuario = require('../models/users')


const validarJWT = async (req, res = response, next) => {

    //aca colocamos x-token
    //pero puede ser otro nombre
    //queda a discricion del desarrollador
    //esto va en el header del postman
    const token = req.header('x-token')

    //Valido que envien el TOKEN
    if (!token) {
        return res.status(401).json({
            msg: 'No hay token'
        })
    }

    //Valido que sean un token valido, DEL USUARIO
    try {

        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY)

        //Leemos el usuario que modifica uid
        const usuario = await Usuario.findById(uid)
        console.log(usuario)

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

        req.usuario = usuario
        next()
    } catch (error) {
        console.warn(`${error}`.bgRed)
        res.status(401).json({
            msg: 'Token no valido'
        })
    }
}



module.exports = {
    validarJWT
}