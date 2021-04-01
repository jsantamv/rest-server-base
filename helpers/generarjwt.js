/**
 * Genera mi json web token 
 * en forma de promesa para 
 * utilizar el callback
 */

const jwt = require('jsonwebtoken')


const generarJWT = (uid = '') => {

    return new Promise((resolve, reject) => {

        const payload = { uid }

        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h'
        }, (err, token) => {
            if (err) {
                console.error(err)
                reject('No se pudo generar el TOKEN')
            } else {
                resolve(token)
            }
        })
    })
}



module.exports = {
    generarJWT
}