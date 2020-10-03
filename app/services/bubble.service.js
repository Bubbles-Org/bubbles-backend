const db = require("../models");
const Bubble = db.bubble;

async function create(data){
    try {
        const bubble = new Bubble(data);
        await bubble.save(bubble);

        return bubble;
    } catch (error) {
        return error;
    }
}

async function get(id){
    try {
        const bubble = await Bubble.findById(id);

        if(!bubble){
            return null;
        }

        return bubble;
    } catch (error) {
        return error;
    }
}

async function getAll(){
    try {
        const bubbles = await Bubble.getAll();

        if(!bubbles){
            return null;
        }

        return bubbles;
    } catch (error) {
        return bubbles;
    }
}

module.exports = {
    create,
    get,
    getAll
}