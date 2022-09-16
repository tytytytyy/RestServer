var mongoose = require('mongoose');
const User = require('../user/UserModel');


const ForumThreadSchema = new mongoose.Schema({
    ownerID: String,
    name: String,
    description: String,
}, { timestamps: true });


const ForumThread = mongoose.model("ForumThread", ForumThreadSchema);

module.exports = ForumThread;