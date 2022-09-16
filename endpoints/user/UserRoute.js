var express = require('express');
var router = express.Router();
var logger = require('../../config/winston');

const User = require('./UserModel');

var userService = require("./UserService");
var authenticationService = require('../authenticate/AuthenticationUtils');


/*get all Users */

router.get('/', authenticationService.isAuthenticated, function(req, res, next) {

    logger.debug("Try to return List of Users with Tokens");

    userService.getUsers(function(err, result) {
        if (result) {

            res.status(200).json(filterMany(result));
        } else {
            res.status(404).json({ "Error": "Es gab Probleme" });
        }

    })
});


/*Create a new User */

router.post('/', authenticationService.isAuthenticated, function(req, res, next) {

    console.log('Try to create new user')

    userService.createNewUser(req, function(err, result) {

        if (result) {
            console.log(result)

            res.status(200).json(filterOne(result));
        } else {
            res.status(400).json({ "Error": "Es gab Probleme" });
        }

    });
});


/*Update User*/

router.put('/:userID', authenticationService.isAuthenticated, function(req, res, next) {

    userService.updateUser(req.params.userID, req.body, function(err, result) {
        if (result) {
            res.status(200).json(filterOne(result));
        } else {
            res.status(400).json({ "Error": "Es gab Probleme" });
        }
    });

});


/*Get by User ID */

router.get('/:userID', authenticationService.isAuthenticated, function(req, res, next) {

    logger.debug();

    userService.findUserby(req.params.userID, function(err, result) {
        if (result) {

            res.status(200).json(filterOne(result));

        } else {
            res.status(404).json({ "Error": "Es gab Probleme" });
        }
    });
});


/*Delete User */

router.delete('/:userID', authenticationService.isAuthenticated, function(req, res, next) {

    userService.deleteUser(req.params.userID, function(err, result) {

        if (result) {
            res.status(204).json(Object.values(result));
        } else {
            res.status(404).json({ "Error": "Es gab Probleme" });
        }
    });
});

function filterMany(users) {

    logger.debug("Filter many User");
    let newresult = users.map(user => {
        return { userID: user.userID, userName: user.userName, isAdministrator: user.isAdministrator }; //?
    });

    logger.debug(newresult);


    return newresult;
}

function filterOne(user) {

    logger.debug("Filter one User");
    var newresult = new User({ userID: user.userID, userName: user.userName, isAdministrator: user.isAdministrator });

    logger.debug("Filtered User: " + newresult);

    return newresult;

}


module.exports = router;