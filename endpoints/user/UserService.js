const { Query } = require('mongoose');
const User = require('./UserModel');
var logger = require('../../config/winston');


function getUsers(callback) {
    User.find(function(err, users) {
        if (err) {
            logger.error("Fehler beim Suchen: " + err)
            return callback(err, null)
        } else {
            return callback(null, users);
        }
    })
}


function findUserby(searchUserID, callback) {

    logger.debug("Try to find User by ID: " + searchUserID);

    if (!searchUserID) {
        callback("UserID is missing");
    } else {
        User.findOne({ userID: searchUserID }, function(err, user) {
            if (err || searchUserID.length == 0) {
                console.log("Did not find user for userID:" + searchUserID);
                callback("Did not find user for userID: " + searchUserID, null);
            } else {
                if (user) {
                    console.log('Found user with userID: ' + searchUserID);
                    callback(null, user);
                } else {

                    console.log("could not find user for user ID: " + searchUserID)
                    callback(null, null);

                }

            }
        });
    }
}



function createNewUser(req, callback) {

    var user = req.body;
    var userid = user.userID;

    logger.debug("body:" + req.body);

    logger.debug("Try to create User :" + userid);


    User.findOne({ userID: userid }, function(err, result) {
        if (result) {
            console.log("gibts schon: " + userid);
            callback("User already exists", null)
        } else {
            logger.debug("User doesnt exist so system trys to create a new User");

            var newUser = new User(user);

            newUser.save(function(err) {
                if (err) {
                    logger.debug("Could not create a new User");
                    callback("user could not be saved" + err, null);
                } else {
                    logger.debug("created the new User: " + user.userID);
                    callback(null, newUser);
                }
            });
        }
    });
}


function updateUser(userid, updateQuery, callback) {

    logger.debug("start to update: " + userid);

    User.findOne({ userID: userid }, function(err, toBeUpdated) {

        if (toBeUpdated) {

            logger.debug("User to be udated: " + toBeUpdated);

            Object.assign(toBeUpdated, updateQuery);

            toBeUpdated.save(function(err) {
                if (err) {
                    callback("user could not be updated" + err, null);
                } else {
                    logger.debug("updated the User to: " + toBeUpdated);
                    callback(null, toBeUpdated);
                }
            });

        } else {
            logger.error("User doesnt exist.");
            callback("User doesnt exist so cant be updated.", null);
        }
    });

}


function deleteUser(user, callback) {

    logger.debug("Try to delete User by ID: " + user);


    User.findOne({ userID: user }, function(err, result) {
        if (result) {
            const query = { "userID": user };

            User.deleteOne(query, function(err) {
                if (err) callback("Deletion failed", null);;
                logger.debug("1 document deleted");
                callback(null, query);
            });


        } else {
            logger.error("User doesnt exist.");
            callback("User doesnt exist so cant be deleted.", null);
        }
    });
}

/*admin bei start anlegen */
function createDefaultAdmin() {

    var user = new User({
        "userID": "admin",
        "userName": "Default Admin Account",
        "password": "123",
        "isAdministrator": true
    });

    User.findOne({ userID: "admin" }, function(err, result) {
        if (result) {
            logger.debug("admin already exists, so nothing is created");
        } else {
            logger.debug("User doesnt exist so system trys to create defualt admin");

            var newUser = new User(user);

            newUser.save(function(err) {
                if (err) {
                    logger.debug("Could not create a new User");
                } else {
                    logger.debug("created the new User: " + newUser);
                }
            });
        }
    });




}


module.exports = {
    getUsers,
    findUserby,
    deleteUser,
    updateUser,
    createNewUser,
    createDefaultAdmin,
}