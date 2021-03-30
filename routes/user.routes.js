const { Router } = require('express')
const { usersGet,
    usersDelete,
    usersPatch,
    usersPut,
    usersPost } = require('../controllers/users.controller')

const router = Router()


//Llamados
router.get('/', usersGet)

//esta es la forma de enviar
router.put('/:id', usersPut)

router.post('/', usersPost)

router.delete('/', usersDelete)

router.patch('/', usersPatch)


module.exports = router