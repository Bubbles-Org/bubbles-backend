const UserService = require('../services/user.service');
const log = require('../services/log.service');
const http = require('../services/http.service');

const create = async (req,res) => {
    try {
        log.info("Iniciando criação de usuário");

        const data = req.body;
        const email = data.email;
        /* Dá erro aqui, investigar
        const user = await UserService.findByEmail(email)
                    .then(userData => {
                        if(userData){
                            return http.badRequest(res,"Já existe um usuário com este email");
                        }
                    })
*/
        const createdUser = await UserService.create(data)
                            .then(userData => {
                                return http.ok(res,userData);
                            });
        return createdUser;

    } catch (error) {
        log.error("Erro cadastrar usuário", req.originalUrl, error);
        return http.internalServerError(res);
    }
}

const get = async (req,res) => {
    try {
        log.info("Iniciando obtenção de usuário");

        const id = req.params.id;

        const user = await UserService.get(id)
                            .then(userData => {
                                if(!userData){
                                    return http.notFound(res, "Nenhum usuário encontrado");
                                }
                                return http.ok(res,userData);
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
                                return http.ok(res,userData);
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