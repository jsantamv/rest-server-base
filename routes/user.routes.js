const { Router } = require('express')
const { check } = require('express-validator')

const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt')

const { usersGet,
    usersDelete,
    usersPatch,
    usersPut,
    usersPost } = require('../controllers/users.controller')
const { validRole, emailExist, userExistById } = require('../helpers/db-validators')

//Enrutador
const router = Router()

//Llamados
router.get('/', usersGet)

//esta es la forma de enviar
router.put('/:id', [
    check('id', 'No es un Id valido').isMongoId(),
    check('id').custom(userExistById),
    check('rol').custom(validRole),
    validarCampos
], usersPut)

//middleware para validaciones check
router.post('/', [
    check('nombre', 'Nombre: es obligatorio').not().isEmpty(),
    check('password', 'Password: debe de ser mas de 6 caracteres').isLength({ min: 6 }),
    check('correo', 'Correo: formato invalido').isEmail(),
    check('correo').custom(emailExist),
    check('rol').custom(validRole),
    validarCampos
], usersPost)

router.delete('/:id', [
    validarJWT,
    check('id', 'No es un Id valido').isMongoId(),
    check('id').custom(userExistById),
    validarCampos
], usersDelete)

router.patch('/', usersPatch)


module.exports = router