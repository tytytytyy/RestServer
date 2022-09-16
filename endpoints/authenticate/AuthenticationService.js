var jwt = require("jsonwebtoken");
var config = require("config");
var logger = require('../../config/winston')
var userService = require('../user/UserService');

/*Create Token */

function createSessionToken(props, callback) {

    logger.debug("AuthenticationService: create Token for " + props)

    if (!props) {
        logger.error("Error: have no json body")
        callbback("JSON Body missing", null, null)
        return
    }

    userService.findUserby(props.userID, function(err, user) {

        if (user) {

            logger.debug("found user, check password")

            user.comparePassword(props.password, function(err, isMatch) {

                if (err) {
                    logger.error("password is invalid");
                    callback(err, null);
                } else {
                    if (isMatch) {
                        logger.debug("password is correct. Create token");

                        const jwtKey = config.get('session.tokenKey');
                        // TTL
                        const jwtExpirySeconds = '100m';
                        const token = jwt.sign({ userid: user.userID, userName: user.userName, isAdministrator: user.isAdministrator }, jwtKey, {
                            algorithm: 'HS256',
                            expiresIn: jwtExpirySeconds
                        })

                        logger.debug("For user: " + user + " Token created: " + token);

                        callback(null, token, user);

                    } else {
                        logger.error("password or userid are invalid");
                        callback(err, null)
                    }
                }
            })
        }

    })
}



module.exports = {
    createSessionToken,
}