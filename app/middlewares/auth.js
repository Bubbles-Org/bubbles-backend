const jwt = require('jsonwebtoken');
const http = require('../services/http.service');
const { User } = require('../models/');

module.exports = function (req, res, next) {
    const { authorization } = req.headers;

    if (!authorization)
        return http.unauthorized(res, 'Você não está autorizado a realizar esta ação');

    const [type, token] = authorization.split(' ');

    if (!type || !token || type !== 'Bearer')
        return http.unauthorized(res, 'Você não está autorizado a realizar esta ação');

    try {
        const decoded = jwt.verify(token, config.JWT.secret);

        User.findById(decoded.id)
            .then((user) => {
                req.user = user;
                next();
            });
    } catch (e) {
        return http.unauthorized(res, 'Você não está autorizado a realizar esta ação');
    }
}
