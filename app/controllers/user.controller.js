const UserService = require("../services/user.service");
const log = require("../services/log.service");
const http = require("../services/http.service");

const create = async (req, res) => {
  try {
    log.info("Iniciando criação de usuário");

    const data = req.body;
    const email = data.email;
    const password = data.password;
    /* Dá erro aqui, investigar
        dá pra usar o unique do mongoose e capturar o erro específico.
        const user = await UserService.findByEmail(email)
                    .then(userData => {
                        if(userData){
                            return http.badRequest(res,"Já existe um usuário com este email");
                        }
                    })
*/

    const createdUser = await UserService.create(data);
    return http.ok(res, createdUser);
  } catch (error) {
    log.error("Erro cadastrar usuário", req.originalUrl, error);
    return http.internalServerError(res);
  }
};

const get = async (req, res) => {
  try {
    log.info("Iniciando obtenção de usuário");

    const id = req.params.id;

    const user = await UserService.get(id);

    if (!user) {
      return http.notFound(res, "Usuário não encontrado");
    }

    return http.ok(res, user);
  } catch (error) {
    log.error("Erro obter usuário", req.originalUrl, error);
    http.internalServerError(res);
  }
};

const getAll = async (req, res) => {
  try {
    log.info("Iniciando obtenção de todos os usuários");

    const user = await UserService.getAll();

    return http.ok(res, user);
  } catch (error) {
    log.error("Erro obter usuários", req.originalUrl, error);
    http.internalServerError(res);
  }
};

const deleteUser = async (req, res) => {
  try {
    log.info("Deletando um usuario do sistema");

    const id = req.params.id;

    const user = await UserService.remove(id).then((userData) => {
      if (!userData) {
        return http.notFound(res, "Nenhum usuário encontrado");
      }
      return http.ok(res, userData);
    });
    return user;
  } catch (error) {
    log.error("Erro ao tentar deletar usuario!", res.originalUrl, error);
    http.internalServerError(res);
  }
};

module.exports = {
  create,
  get,
  getAll,
  deleteUser,
};
