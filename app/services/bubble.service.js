const db = require("../models");
const Bubble = db.bubble;

async function create(data) {
    try {
        const bubble = new Bubble(data);
        await bubble.save(bubble);

        return bubble;
    } catch (error) {
        return error;
    }
}

async function get(id) {
    try {
        const bubble = await Bubble.findById(id);

        if (!bubble) {
            return null;
        }

        return bubble;
    } catch (error) {
        return error;
    }
}

async function getAll() {
    try {
        const bubbles = await Bubble.getAll();

        if (!bubbles) {
            return null;
        }

        return bubbles;
    } catch (error) {
        return bubbles;
    }
}

async function deleteBubble(id) {
    try {
        const bubble = await Bubble.deleteOne(id);
        if (!bubble) {
            return null;
        }
        return bubble;
    } catch (error) {
        return error;
    }
}

async function updateBubble(id, info) {

    try {
        const bubble = await Bubble.findById(id);
        bubble = bubble.update(info);
        if (!bubble) {
            return null;
        }
        return bubble;
        return bubble;
    } catch (error) {
        return error;
    }

}



module.exports = {
    create,
    get,
    getAll,
    deleteBubble,
    updateBubble
}