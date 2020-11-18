const log = require('../services/log.service');
const service = require('../services/auth.service');
const http = require('../services/http.service');

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        log.info('Iniciando login', { email });

        const result = await service.login(email, password);
        if (!result){
            return http.notFound(res, 'E-mail ou senha inválido(a)');
        }
        
        log.info('Login finalizado', { email });

        const { user, token } = result;

        return http.ok(res, { user, token });
    } catch (e) {
        log.error('Erro ao realizar login', req.originalUrl, e);
        http.internalServerError(res);
    }
}

const googleLogin = async (req, res) => {
    try {
        const { email, name } = req.body;

        log.info('Iniciando login', { email });

        const result = await service.googleLogin(email, name);

        if (!result){
            return http.notFound(res, 'E-mail ou senha inválido(a)');
        }

        log.info('Login finalizado', { email });

        const { user, token } = result;

        return http.ok(res, { user, token });

    }  catch (e) {
        log.error('Erro ao realizar login', req.originalUrl, e);
        http.internalServerError(res);
    }
}

module.exports = { login, googleLogin }