var express = require('express');
var router = express.Router();
var logger = require('../../config/winston');
var userService = require('../user/UserService');

var authenticationService = require("./AuthenticationService.js");

/*Token erstellen */

router.get('/', function(req, res, next) {

    console.log('want to create token'+ req.headers.authorization)

    const base64Credentials = req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [userID, password] = credentials.split(':');

    console.log({ userID, password })

    authenticationService.createSessionToken({ userID, password }, function(err, token, user) {

        if (token) {

            res.header("Authorization", "Bearer " + token);

            if (user) {
                const { id, userID, userName, ...partialObject } = user;
                const subset = { id, userID, userName };
                console.log(JSON.stringify(subset))
                res.status(200).json({ "Sucess": "Token was created" });

            } else {
                console.log("User is null, even tough a token has been created. Error: " + err);
                res.status(401).json({ "Error": "User is null, even tough a token has been created." });


            }
        } else {
            console.log("Token has not been created, Error: " + err);
            res.status(401).json({ "Error": "Token has not been created" });
        }

    })

})

module.exports = router;