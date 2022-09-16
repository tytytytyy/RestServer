const { Query } = require('mongoose');
const ForumMessage = require('../forumMessage/ForumMessageModel');
const ForumThread = require('./ForumThreadModel');
var logger = require('../../config/winston');



function getForumThreads(callback) {

    logger.debug("Try to return List of ForumThreads");

    ForumThread.find(function(err, forumThread) {

        if (err) {
            logger.error("Fehler beim Suchen: " + err)
            return callback(err, null)
        } else {
            return callback(null, forumThread);
        }
    })
}



function createNewForumThread(req, callback) {

    var owner = getUserObject(req).userid;
    logger.debug("Try to create new ForumThread by " + owner);

    var newForumThread = new ForumThread(req.body);
    newForumThread.ownerID = owner;

    newForumThread.save(function(err) {
        if (err) {
            logger.debug(err);

            logger.debug("Could not create a new ForumThread");
            callback("ForumThread could not be saved" + err, null);
        } else {
            logger.debug("created the new ForumThread: " + newForumThread.name);
            callback(null, newForumThread);
        }
    });

}

/*Find by Forum ID */

function findForumThreadBy(searchForumID, callback) {

    logger.debug("Try to find User by ID: " + searchForumID); //?

    if (!searchForumID) {
        callback("ForumID is missing");
    } else {
        ForumThread.findOne({ _id: searchForumID }, function(err, forum) {
            if (err || searchForumID.length == 0) {
                console.log("Did not find forum for ForumID:" + searchForumID);
                callback("Did not find forum for ForumID: " + searchForumID, null);
            } else {
                if (forum) {
                    console.log('Found forum with forumID: ' + searchForumID);
                    callback(null, forum);
                } else {

                    console.log("could not find forum for forum ID: " + searchForumID)
                    callback(null, null);

                }

            }
        });
    }
}

/*Find Many by Owner ID */


function findAllForumThreadsBy(ownerID, callback) {

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

function findAllForumThreadsByForumID(forumID, callback) {

    logger.debug("Try to find Threads by forumID: " + forumID); //?

    if (!forumID) {
        callback("ForumID is missing");
    } else {
        ForumThread.find({ _id: forumID }, function(err, forum) {
            if (err || ownerID.length == 0) {
                console.log("Did not find forum for forumID:" + forumID);
                callback("Did not find forum for forumID: " + forumID, null);
            } else {
                if (forum) {
                    console.log('Found forum with forumID: ' + forumID + " Count: " + forum.length);
                    callback(null, forum);
                } else {

                    console.log("could not find forum for forumID: " + forumID)
                    callback(null, null);

                }

            }
        });
    }
}

function updateForumThread(forumid, updateQuery, callback) {

    logger.debug("start to update: " + forumid);

    ForumThread.findOne({ _id: forumid }, function(err, toBeUpdated) {

        if (toBeUpdated) {

            logger.debug("Forum to be udated: " + toBeUpdated);

            Object.assign(toBeUpdated, updateQuery);

            toBeUpdated.save(function(err) {
                if (err) {
                    callback("Forum could not be updated" + err, null);
                } else {
                    logger.debug("updated the Forum to: " + toBeUpdated);
                    callback(null, toBeUpdated);
                }
            });

        } else {
            logger.error("User doesnt exist.");
            callback("User doesnt exist so cant be updated.", null);
        }
    });

}

function deleteForumThread(forumThreadID, callback) {

    logger.debug("Try to delete forumThread by ID: " + forumThreadID);
    const query = { _id: forumThreadID };


    ForumThread.findOne(query, function(err, result) {
        if (result) {

            ForumThread.deleteOne(query, function(err) {
                if (err) {
                    callback("Deletion failed", null);
                } else {
                    logger.debug("1 document deleted");
                    logger.debug("Also delete all Messages in the ForumThread: " + forumThreadID);

                    ForumMessage.deleteMany({ forumThreadID: forumThreadID }, function(err, forum) {
                        if (err) callback("Deletion failed", null);;
                        logger.debug("deleted all Messages in ForumThread");
                        callback(null, query);
                    });

                }

            });


        } else {
            logger.error("Forum doesnt exist.");
            callback("User doesnt exist so cant be deleted.", null);
        }
    });
}

function getUserObject(req) {

    let token = req.headers.authorization.split(" ")[1];
    var base64Payload = token.split('.')[1];
    var payload = Buffer.from(base64Payload, 'base64');
    var payloadObject = JSON.parse(payload.toString());

    logger.debug(JSON.stringify(payloadObject));

    return payloadObject;
}




module.exports = {
    getForumThreads,
    createNewForumThread,
    findForumThreadBy,
    updateForumThread,
    deleteForumThread,
    findAllForumThreadsBy
}