var mongoose = require('mongoose');
const User = require('../user/UserModel');


const ForumMessageSchema = new mongoose.Schema({
    forumThreadID: String,
    title: String,
    text: String,
    authorID: String,
}, { timestamps: true });


const forumMessage = mongoose.model("ForumMessage", ForumMessageSchema);

module.exports = forumMessage;