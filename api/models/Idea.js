const mongoose = require('mongoose');
const { Schema } = mongoose;

const IdeaSchema = new Schema({
    author: {type: mongoose.Schema.ObjectId, ref: 'User'},
    ideas: [{
        title: String,
        content: String,
    }],
});

const IdeaModel = mongoose.model('Idea', IdeaSchema );

module.exports = IdeaModel;