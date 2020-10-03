const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const BubbleSchema = new Schema({
    name: String,
    users: {
        user:{
            userId: String
        }
    },
    recomendations: {
        recomendation:{
            recomendationId: String
        }
    }
});

const model = mongoose.model('Bubble', BubbleSchema);

module.exports = model;
