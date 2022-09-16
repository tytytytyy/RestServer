var express = require('express');
var router = express.Router();
var logger = require('../../config/winston');

const ForumMessage = require('./ForumMessageModel');
const forumMessageService = require('./ForumMessageService');

var authenticationService = require('../authenticate/AuthenticationUtils');

/*get all ForumMessages* */

router.get('/', function(req, res, next) {

    logger.debug(Object.keys(req.query).length);

    if (Object.keys(req.query).length == 0) {

        forumMessageService.getForumMessages(function(err, result) {

            logger.debug("get all ForumMessages");

            if (result) {
                res.status(200).json(result);
            } else {
                res.status(404).json({ "Error": "Es gab Probleme" });
            }

        })

    } else {

        forumMessageService.findAllForumMessagesBy(req.query.forumThreadID, function(err, result) {
            if (result) {
                res.status(200).json(result);
            } else {
                res.status(404).json({ "Error": "Es gab Probleme" });
            }
        });
    }


});


/*Update ForumMessage*/

router.put('/:_id', authenticationService.isAuthenticated, function(req, res, next) {

    logger.debug("Update");

    forumThreadService.updateForumThread(req.params._id, req.body, function(err, result) {
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ "Error": "Es gab Probleme" });
        }
    });

});


/*Create a new ForumMessage */

router.post('/', authenticationService.isAuthenticatedwithoutAdmin, function(req, res, next) {

    logger.debug('Try to create new ForumMessage')

    forumMessageService.createNewForumMessage(req, function(err, result) {

        if (result) {
            res.status(200).json(result);
        } else {
            res.status(400).json({ "Error": "Es gab Probleme" });
        }

    });
});


/*Read ForumMessage Entry of current Users*/

router.get('/:_id', function(req, res, next) {

    logger.debug(JSON.stringify(req.params.Object));

    if (req.params._id == "myForumThreads") {


        if (typeof req.headers.authorization !== "undefined") {

            logger.debug("Get Forums of the current User");

            let token = req.headers.authorization.split(" ")[1];
            var base64Payload = token.split('.')[1];
            var payload = Buffer.from(base64Payload, 'base64');
            var payloadObject = JSON.parse(payload.toString());

            console.log("List all Threads of user: " + JSON.stringify(payloadObject.userid));

            forumThreadService.findAllForumThreadsBy(payloadObject.userid, function(err, result) {
                if (result) {
                    res.status(200).json(result);
                } else {
                    res.status(404).json({ "Error": "Es gab Probleme" });
                }
            });

        } else {
            res.status(404).json({ "Error": "Es gab Probleme" });



        }

    } else {

        forumThreadService.findForumThreadBy(req.params._id, function(err, result) { //?
            if (result) {
                res.status(200).json(result);
            } else {
                res.status(404).json({ "Error": "Es gab Probleme" });
            }
        });


    }
});


/*Delete ForumThread */

router.delete('/:_id', authenticationService.isAuthenticated, function(req, res, next) {

    forumMessageService.deleteForumMessage(req.params._id, function(err, result) {

        if (result) {
            res.status(204).json(Object.values(result));
        } else {
            res.status(404).json({ "Error": "Es gab Probleme" });
        }
    });
});



module.exports = router;