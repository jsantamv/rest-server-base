const { response } = require('express')


const usersGet = (req, res = response) => {

    //Este es cuando enviamos los parametros
    //Por medio de un querie
    const { q,
        nombre = 'No name',
        apiKey,
        page =1,
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

const usersPost = (req, res = response) => {
    //esta es lo que me envia 
    //del paramatro en el request
    //cuando en el body es de tipo JSON
    const { nombre, edad } = req.body;

    //esto es lo que devuelvo
    res.json({
        msg: "usersPost API - Controlador",
        nombre,
        edad
    })
}

const usersPut = (req, res = response) => {

    const id = req.params.id

    const { nombre, edad } = req.body;

    res.json({
        msg: "usersPut API - Controlador",
        id,
        nombre,
        edad
    })
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


module.exports = {
    usersGet,
    usersDelete,
    usersPatch,
    usersPut,
    usersPost
}



