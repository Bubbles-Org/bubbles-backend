const UserService = require('../services/user.service');
const log = require('../services/log.service');
const http = require('../services/http.service');

const create = async (req,res) => {
    try {
        log.info("Iniciando criação de usuário");

        const data = req.body;
        const email = data.email;

        const createdUser = await UserService.create(data)
                            .then(userData => {
                                res.status(200).send({
                                    userData,
                                });
                            });
        return createdUser;

    } catch (error) {
        log.error("Erro cadastrar usuário", req.originalUrl, error);
        http.internalServerError(res);
    }
}

const get = async (req,res) => {
    try {
        log.info("Iniciando obtenção de usuário");

        const id = req.params.id;

        const user = await UserService.get(id)
                            .then(userData => {
                                res.status(200).send({
                                    userData,
                                });
                            });
        return user;
    } catch(error){
        log.error("Erro obter usuário", req.originalUrl, error);
        http.internalServerError(res);
    }
}

const getAll = async (req,res) => {
    try {
        log.info("Iniciando obtenção de todos os usuários");

        const user = await UserService.getAll()
                            .then(userData => {
                                res.status(200).send({
                                    userData
                                });
                            });
        return user;
    } catch(error){
        log.error("Erro obter usuários", req.originalUrl, error);
        http.internalServerError(res);
    }
}

module.exports = {
    create,
    get,
    getAll
}