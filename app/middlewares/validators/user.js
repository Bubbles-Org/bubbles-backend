const { body, query } = require('express-validator');

const create = [
    body('name')
        .notEmpty().withMessage('name is required')
        .isString().withMessage('name must be a string'),

    body('email')
        .notEmpty().withMessage('email is required')
        .isString().withMessage('email must be a string')
        .isEmail().withMessage('email format is invalid'),

    body('password')
        .notEmpty().withMessage('password is required')
        .isString().withMessage('password must be a string')
        .isLength({ min: 5 }).withMessage('password must have at least 5 characters')
        .matches(/[0-9]+/).withMessage('password must have at least one number')
        .matches(/[a-z]+/).withMessage('password must have at least one lowcase character')
        .matches(/[A-Z]+/).withMessage('password must have at least one uppercase character')
]

module.exports = {
    create
}