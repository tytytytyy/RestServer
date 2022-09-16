var express = require('express');
var router = express.Router();
var path = require('path');


router.get('/', function(request, response) {
    response.sendFile(path.join(__dirname + '/upload.html'))
})

router.post('/upload', function(req, res) {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    let sampleFile = req.files.File;
    console.log(req.files.File)
    console.log(sampleFile)

    sampleFile.mv(__dirname + '/../../uploadFiles/' + sampleFile.name, function(err) {
        if (err)
            return res.status(500).send(err);

        res.send('File upload!')


    });
});

module.exports = router;