const jwt = require('jsonwebtoken');
const config = require('../config/enviroment')
const http = require('../services/http.service');
const User = require("../models/user.model");

module.exports = async function (req, res, next) {
    try {
        const { authorization } = req.headers;

        if (!authorization)
            return http.unauthorized(res, 'Você não está autorizado a realizar esta ação');

        const [type, token] = authorization.split(' ');

        if (!type || !token || type !== 'Bearer')
            return http.unauthorized(res, 'Você não está autorizado a realizar esta ação');
            
        const decoded = jwt.verify(token, config.JWT.secret);
        const user = await User.findById(decoded.user.id);
        req.user = user
        next();
    } catch (e) {
        return http.unauthorized(res, 'Você não está autorizado a realizar esta ação');
    }
}
