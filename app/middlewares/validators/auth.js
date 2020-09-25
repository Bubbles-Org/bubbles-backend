const { body } = require('express-validator');

module.exports = [
    body('email')
        .isEmail().withMessage('O formato do e-mail é inválido'),
    body('password')
        .isLength({ min: 8 }).withMessage('A senha deve conter 8 dígitos, letras, números e caracteres especiais')
]