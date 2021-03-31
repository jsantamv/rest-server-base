const { response } = require('express')
const bcrypt = require('bcryptjs');
const Usuario = require('../models/users');




const usersPut = async (req, res = response) => {

    //id a actualizar
    const { id } = req.params
    //desestructuramos para exlcuir lo que no quiero utilizar
    const {_id, password, google, correo, ...user } = req.body;

    if (password) {
        //Encryptar el password
        const salt = bcrypt.genSaltSync()
        user.password = bcrypt.hashSync(password, salt)
    }
    
    const usuario = await Usuario.findByIdAndUpdate(id, user)

    res.json({
        msg: `Usuario: ${user.nombre} actualizado correctamente`,
        usuario
    })
}


//#region Other Methods
const usersGet = (req, res = response) => {

    //Este es cuando enviamos los parametros
    //Por medio de un querie
    const { q,
        nombre = 'No name',
        apiKey,
        page = 1,
        limit = 10
    } = req.query

    res.json({
        msg: "get API - Controlador",
        q,
        nombre,
        apiKey,
        page,
        limit
    })
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
        res.json({
            msg: "Datos almacenados",
            user
        })
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



