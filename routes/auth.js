/*
    path: api/login
*/

const {Router, response} = require('express');
const { check, validationResult } = require('express-validator');
const { createUser, login, renewToken } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');


const router = Router();

router.post('/new', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El correo es obligatorio').not().isEmpty(),
    check('email', 'Error al digitar tu correo').isEmail(),
    check('password', 'La contraseña es obligatorio').not().isEmpty(),
    validateFields
], createUser);

router.post('/', [
    check('email', 'El correo es obligatorio').not().isEmpty(),
    check('email', 'Error al digitar tu correo').isEmail(),
    check('password', 'La contraseña es obligatorio').not().isEmpty(),
    validateFields
], login );

router.get('/renew', validateJWT, renewToken);

module.exports = router;