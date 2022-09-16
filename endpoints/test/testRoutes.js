const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
    res.send('Hello!')
})

router.get('/json', function(req, res) {
    res.json('hallo')
})

module.exports = router;