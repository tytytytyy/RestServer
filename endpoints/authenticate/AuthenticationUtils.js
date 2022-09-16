var jwt = require("jsonwebtoken");
var config = require("config");
var logger = require('../../config/winston')
var userService = require('../user/UserService');


/*authenticate */

function isAuthenticated(req, res, next) {


    logger.debug("Try to authenticate and check admin status: " + req.headers.authorization);

    if (typeof req.headers.authorization !== "undefined") {

        logger.debug("token exists");

        logger.debug("Prüfe Token: ", req.headers);
        logger.debug("Prüfe Token: ", req.headers.authorization);


        let token = req.headers.authorization.split(" ")[1];

        logger.debug(token);

        var privateKey = config.get('session.tokenKey');

        logger.debug(privateKey);

        var payload = jwt.verify(token, privateKey, { algorithm: "HS256" }, (err, user) => {

            if (err) {
                res.status(401).json({ error: "Not Authorized" });
            } else {

                logger.debug(token);
                logger.debug(privateKey);

                var base64Payload = token.split('.')[1];
                var payload = Buffer.from(base64Payload, 'base64');
                var payloadObject = JSON.parse(payload.toString());

                logger.debug("Prüfe Admin Status");

                if (payloadObject.isAdministrator == true) {

                    logger.debug("Authentifieziert und Admin check!");
                    return next();

                } else {
                    logger.debug("Error: " + err);

                    res.status(401).json({ error: "Not Authorized" });
                    return;
                }

            }

        });
    } else {
        logger.debug("Kein Token");
        res.status(401).json({ error: "Not Authorized" });
        return;
    }
}

function isAuthenticatedwithoutAdmin(req, res, next) {

    logger.debug("Try to authenticate: " + req.headers.authorization);

    if (typeof req.headers.authorization !== "undefined") {

        logger.debug("token exists");
        logger.debug("Prüfe Token");

        let token = req.headers.authorization.split(" ")[1];
        var privateKey = config.get('session.tokenKey');
        var payload = jwt.verify(token, privateKey, { algorithm: "HS256" }, (err, user) => {

            if (err) {
                logger.debug("Token ist Falsch");
                res.status(401).json({ error: "Not Authorized" });
            } else {

                logger.debug(token);
                logger.debug(privateKey);

                var base64Payload = token.split('.')[1];
                var payload = Buffer.from(base64Payload, 'base64');
                var payloadObject = JSON.parse(payload.toString());

                logger.debug("Authentifieziert und Admin check!");
                return next();
            }
        });
    } else {
        logger.debug("Token is undefined");
        res.status(401).json({ error: "Not Authorized" });
    }
}



module.exports = {
    isAuthenticated,
    isAuthenticatedwithoutAdmin
}