const { response } = require('express')
const bcryptjs = require('bcryptjs')
const User = require('../models/users')
const { generarJWT } = require('../helpers/generarjwt')

const login = async (req, res = response) => {

    const { correo, password } = req.body

    try {

        // validar correo existe y usuario activo
        const usuario = await User.findOne({ correo })

        if (!usuario) {
            return res.status(400).json({
                msg: 'El usuario / password no son correctos - correo'
            })
        }

        console.log(usuario.estado)
        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'El usuario / password no son correctos - estado: false'
            })
        }

        // validar la contrase;a
        const validPassword = bcryptjs.compareSync(password, usuario.password)
        if (!validPassword) {
            return res.status(400).json({
                msg: 'El usuario / password no son correctos - password'
            })
        }

        // Generar JWT
        const token = await generarJWT(usuario.id)


        res.json({
            usuario,
            token
        })

    } catch (err) {
        console.log(`${err}`.red)
        return res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }

}


module.exports = {
    login
}
