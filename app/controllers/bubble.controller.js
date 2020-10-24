const BubbleService = require('../services/bubble.service');
const log = require('../services/log.service');
const http = require('../services/http.service');

const create = async (req, res) => {
    try {   
        log.info("Iniciando a criação de bolha");    
        const data = req.body;
        
        const bubble = await BubbleService.create(data);

        return http.ok(bubble);
    } catch (error) {
        log.error("Erro cadastrar usuário", req.originalUrl, error);
        return http.internalServerError(res);
    }
}

module.exports = {
    create
}