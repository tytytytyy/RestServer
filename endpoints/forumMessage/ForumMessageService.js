const { Query } = require('mongoose');
const ForumMessage = require('./ForumMessageModel');
var logger = require('../../config/winston');

const ForumThread = require('../forumThread/ForumThreadModel');



/*Get all Forum Messages*/

function getForumMessages(callback) {

    logger.debug("Try to return List of all ForumMessages");

    ForumMessage.find(function(err, forumMessage) {

        if (err) {
            logger.error("Fehler beim Suchen: " + err)
            return callback(err, null)
        } else {
            return callback(null, forumMessage);
        }
    })
}

/*Get all Forum Messages by ...*/

function findAllForumMessagesBy(req, callback) {

    var searchForumThreadID = req;

    logger.debug("Try to return List of all ForumMessages by: " + searchForumThreadID);


    ForumMessage.find({ forumThreadID: searchForumThreadID }, function(err, forum) {
        if (err || searchForumThreadID.length == 0) {
            logger.debug("Did not find forumMessges for forumThreadID:" + searchForumThreadID);
            callback("Did not find forumMessages for forumThreadID: " + searchForumThreadID, null);
        } else {
            if (forum) {
                logger.debug('Found forumMessages with forumThreadID: ' + searchForumThreadID + " Count: " + forum.length);
                callback(null, forum);
            } else {

                logger.debug("could not find forum for forumThreadID: " + searchForumThreadID)
                callback(null, null);

            }

        }
    });

}


/*Create new Forum Message */

function createNewForumMessage(req, callback) {

    var author = getUserObject(req).userid;
    var queryForumThreadID = req.body.forumThreadID;

    /*Find ForumMessage */

    logger.debug("Find ForumThread: " + queryForumThreadID);

    ForumThread.findOne({ _id: queryForumThreadID }, function(err, result) { //?
        if (result) {

            console.log("ForumThread exists: " + result);

            logger.debug("Try to create new ForumMessage by " + author + " in: " + queryForumThreadID);

            var newForumMessage = new ForumMessage(req.body);
            newForumMessage.authorID = author;

            newForumMessage.save(function(err) {
                if (err) {
                    logger.debug(err);

                    logger.debug("Could not create a new ForumMessage");
                    callback("ForumMessage could not be saved" + err, null);
                } else {
                    logger.debug("created the new ForumMessage: " + newForumMessage.title);
                    callback(null, newForumMessage);
                }
            });

        } else {

            logger.debug("ForumThread doesnt exist");
            callback("ForumThread doesnt exist", null)

        }
    });


}




/*Find by ForumMessage ID */

function findForumMessageBy(searchForumMessageID, callback) {

    logger.debug("Try to find User by ID: " + searchForumMessageID); //?

    if (!searchForumID) {
        callback("ForumID is missing");
    } else {
        ForumThread.findOne({ _id: searchForumMessageID }, function(err, forum) {
            if (err || searchForumMessageID.length == 0) {
                console.log("Did not find ForumMessage for ForumMessageID:" + searchForumMessageID);
                callback("Did not find ForumMessage for ForumMessageID: " + searchForumMessageID, null);
            } else {
                if (forum) {
                    console.log('Found ForumMessage with ForumMessageID: ' + searchForumMessageID);
                    callback(null, forum);
                } else {

                    console.log("could not find ForumMessage for ForumMessage ID: " + searchForumMessageID)
                    callback(null, null);

                }

            }
        });
    }
}


/*Find all Messages by ForumThreadID */

function findForumMessageByThread(searchForumThreadID, callback) {

    logger.debug("Try to find Message by ForumThreadID: " + searchForumThreadID); //?

    if (!searchForumThreadID) {
        callback("ForumThreadID is missing");
    } else {
        ForumMessage.find({ forumThreadID: searchForumThreadID }, function(err, forum) {
            if (err || searchForumThreadID.length == 0) {
                console.log("Did not find ForumMessage for ForumThreadID:" + searchForumThreadID);
                callback("Did not find ForumMessage for ForumThreadID: " + searchForumThreadID, null);
            } else {
                if (forum) {
                    console.log('Found ForumMessage with ForumThreadID: ' + searchForumThreadID);
                    callback(null, forum);
                } else {

                    console.log("could not find ForumMessage for ForumThreadID: " + searchForumThreadID)
                    callback(null, null);

                }

            }
        });
    }
}


/*Find Many by Owner ID */


function findAllForumMessageBy(ownerID, callback) {

    logger.debug("Try to find Threads by Owner: " + ownerID); //?

    if (!ownerID) {
        callback("ForumID is missing");
    } else {
        ForumThread.find({ ownerID: ownerID }, function(err, forum) {
            if (err || ownerID.length == 0) {
                console.log("Did not find forum for ownerID:" + ownerID);
                callback("Did not find forum for ownerID: " + ownerID, null);
            } else {
                if (forum) {
                    console.log('Found forum with ownerID: ' + ownerID + " Count: " + forum.length);
                    callback(null, forum);
                } else {

                    console.log("could not find forum for ownerID: " + ownerID)
                    callback(null, null);

                }

            }
        });
    }
}

/*Delete Forum Message */

function deleteForumMessage(forumMessageID, callback) {

    logger.debug("Try to delete forumThread by ID: " + forumMessageID);
    const query = { _id: forumMessageID };


    ForumMessage.findOne(query, function(err, result) {
        if (result) {

            ForumMessage.deleteOne(query, function(err) {
                if (err) callback("Deletion failed", null);;
                logger.debug("1 document deleted");
                callback(null, query);
            });


        } else {
            logger.error("forumMessage doesnt exist.");
            callback("forumMessage doesnt exist so cant be deleted.", null);
        }
    });
}

function getUserObject(req) {

    let token = req.headers.authorization.split(" ")[1];
    var base64Payload = token.split('.')[1];
    var payload = Buffer.from(base64Payload, 'base64');
    var payloadObject = JSON.parse(payload.toString());

    return payloadObject;
}

module.exports = {
    getForumMessages,
    createNewForumMessage,
    deleteForumMessage,
    findForumMessageBy,
    findForumMessageByThread,
    findAllForumMessagesBy
}