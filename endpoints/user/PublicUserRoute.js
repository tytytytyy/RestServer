var express = require('express');
var router = express.Router();
var logger = require('../../config/winston');


var publicUserService = require("./UserService.js");

/*get all Users* */

router.get('/', function(req, res, next) {

    publicUserService.getUsers(function(err, result) {

        if (result) {
            res.status(200).json(result); //json objekt
        } else {
            res.status(404).json({ "Error": "Es gab Probleme" });
        }

    })

});


/*Create a new User */

router.post('/', function(req, res, next) {

    console.log('Try to create new user')

    publicUserService.createNewUser(req, function(err, result) {

        if (result) {
            res.status(200).json(result);
        } else {
            res.status(400).json({ "Error": "Es gab Probleme" });
        }

    });
});

/*Update User*/

router.put('/:userID', function(req, res, next) {

    publicUserService.updateUser(req.params.userID, req.body, function(err, result) {
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(400).json({ "Error": "Es gab Probleme" });
        }
    });

});

/*Get by User ID */

router.get('/:userID', function(req, res, next) {

    logger.debug();

    publicUserService.findUserby(req.params.userID, function(err, result) {
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ "Error": "Es gab Probleme" });
        }
    });
});


/*Delete User */

router.delete('/:userID', function(req, res, next) {

    publicUserService.deleteUser(req.params.userID, function(err, result) {

        if (result) {
            res.status(204).json(Object.values(result));
        } else {
            res.status(404).json({ "Error": "Es gab Probleme" });
        }
    });
});




module.exports = router;