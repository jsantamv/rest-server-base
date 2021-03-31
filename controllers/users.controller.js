const { response } = require('express')
const bcrypt = require('bcryptjs');
const Usuario = require('../models/users');


const usersGet = async (req, res = response) => {

    //Este es cuando enviamos los parametros
    //Por medio de un <query>
    //const { q, nombre = 'No name', apiKey, page = 1, limit = 10 } = req.query
    const querie = { estado: true }
    const { limite = 5, desde = 0 } = req.query

    /** Codigo ejecutado en dos pasos */
    // const usuarios = await Usuario.find(querie)
    //     .skip(Number(desde))
    //     .limit(Number(limite))
    // const total = await Usuario.countDocuments(querie)

    //Hacemos una promesa para optimizar la ejecucion en base de datos
    //se ejecuta simultanamente
    //Realizamos una desestructuracion de ARREGLOS
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(querie),
        Usuario.find(querie)
            .skip(Number(desde))
            .limit(Number(limite))
    ])

    res.json({
        total,
        usuarios
    })
}



//#region Other Methods


/**
 * Actualizar un usuario por Id
 * @param {*} req 
 * @param {*} res 
 */
const usersPut = async (req, res = response) => {

    //id a actualizar
    const { id } = req.params
    //desestructuramos para exlcuir lo que no quiero utilizar
    const { _id, password, google, correo, ...user } = req.body;

    //Encryptar el password
    if (password) {
        const salt = bcrypt.genSaltSync()
        user.password = bcrypt.hashSync(password, salt)
    }

    //Guardar
    const usuario = await Usuario.findByIdAndUpdate(id, user)

    res.json(usuario)
}

/**Almacenando 
 * la informacion a base de datos
 */
const usersPost = async (req, res = response) => {
    try {
        //<resto>, es para enviar los demas campos en caso de que se requiera
        //se hace de esta forma si queremos desestructurar los campos 
        //que son obligatorios
        const { nombre, correo, password, rol, ...resto } = req.body;
        const user = new Usuario({ nombre, correo, password, rol })

        //Encryptar el password
        const salt = bcrypt.genSaltSync()
        user.password = bcrypt.hashSync(password, salt)

        //Guardar los datos        
        await user.save()

        //esto es lo que devuelvo
        res.json(user)
    } catch (err) {
        console.log(err)
    }
}

const usersPatch = (req, res = response) => {
    res.json({
        msg: "usersPatch API - Controlador"
    })
}

const usersDelete = (req, res = response) => {
    res.json({
        msg: "usersDelete API - Controlador"
    })
}

//#endregion

module.exports = {
    usersGet,
    usersDelete,
    usersPatch,
    usersPut,
    usersPost
}



