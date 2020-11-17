const BubbleService = require("../services/bubble.service");
const log = require("../services/log.service");
const http = require("../services/http.service");

const create = async (req, res) => {
  try {
    log.info("Iniciando a criação de bolha");
    const data = req.body;
    const bubble = await BubbleService.create({
      userId: req.user._id,
      bubble: data,
    });

    return http.ok(res, bubble);
  } catch (error) {
    log.error("Erro cadastrar usuário", req.originalUrl, error);
    return http.internalServerError(res);
  }
};

const getAll = async (req, res) => {
  try {
    log.info("Iniciando obtenção de todas as bolhas");

    const bubbles = await BubbleService.getAll({ userId: req.user._id });

    return http.ok(res, bubbles);
  } catch (error) {
    log.error("Erro obter bolhas", req.originalUrl, error);
    http.internalServerError(res);
  }
};

const get = async (req, res) => {
  try {
    const id = req.params.id;

    const bubble = await BubbleService.get(id);
    if (!bubble) {
      return http.notFound(res, "Nenhuma bolha encontrada");
    }
    return http.ok(res, bubble);
  } catch (error) {
    log.error("Erro ao recuperar bolha", req.originalUrl, error);
    http.internalServerError(res);
  }
};

const update = async (req, res) => {
  try {
    const id = req.params.id;

    const bubble = await BubbleService.update(id, info).then((bubbleData) => {
      if (!bubbleData) {
        return http.notFound(res, "Nenhuma bolha encontradoa");
      }
      return http.ok(res, bubbleDataData);
    });
    return bubble;
  } catch (error) {
    log.error("Erro ao recuperar bolha", req.originalUrl, error);
    http.internalServerError(res);
  }
};

const deleteBubble = async (req, res) => {
  try {
    const id = req.params.id;

    const bubble = await BubbleService.deleteBubble(id).then((bubbleData) => {
      if (!bubbleData) {
        return http.notFound(res, "Nenhuma bolha encontradoa");
      }
      return http.ok(res, bubbleDataData);
    });
    return bubble;
  } catch (error) {
    log.error("Erro ao recuperar bolha", req.originalUrl, error);
    http.internalServerError(res);
  }
};

const addUser = async (req, res) => {
  try {
    const { role, emailToAdd, bubbleId } = req.body;
    const added = await BubbleService.addUser({
      userId: req.user._id,
      emailToAdd,
      role,
      bubbleId,
    });
    return added;
  } catch (error) {
    log.error("Erro ao adicionar usuario a bolha", req.originalUrl, error);
    http.internalServerError(res);
  }
};

module.exports = {
  create,
  getAll,
  get,
  deleteBubble,
  update,
  addUser,
};
