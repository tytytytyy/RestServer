var mongoose = require('mongoose');

MessageSchema = new mongoose.Schema({
    authorID {
        type: Number,
        required: true
    },
    cachedAuthorName: String,
    subject: {
        type: String,
        required: true
    },
    messageText: String
}, { timestamps: true });

Message = mongoose.model("Message", MessageSchema);

module.export = Message;