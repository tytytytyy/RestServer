const fs = require('fs');
const key = fs.readFileSync('./certificates/key.pem');
const cert = fs.readFileSync('./certificates/cert.pem');
const express = require('express');
const https = require('https');
const app = express();

const cors = require('cors');

const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

const database = require('./database/db')


const testRoutes = require('./endpoints/test/testRoutes')
const publicUserRoutes = require('./endpoints/user/PublicUserRoute')
const userRoutes = require('./endpoints/user/UserRoute')
const authenticationRoutes = require('./endpoints/authenticate/AuthenticationRoute')
const fileUploadRoute = require('./endpoints/fileUpload/fileUpload')
const forumThreadRoute = require('./endpoints/forumThread/forumThreadRoute')
const forumMessageRoute = require('./endpoints/forumMessage/forumMessageRoute')

const userService = require('./endpoints/user/UserService')

//Cors Stuff
app.use("*", cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Expose-Headers","Authorization");
    next();
});
    
app.use(cors({
    exposedHeaders: ['Authorization'],
}));
        

app.use(bodyParser.json());

app.use(fileUpload({
    createParentPath: true,
    limits: { filesize: 50 * 1024 * 1024 },
    useTempfiles: true,
    tempFileDir: '/Temp/'
}));

/**adding routes */

app.use("/", testRoutes);
app.use("/publicUsers", publicUserRoutes);
app.use("/users", userRoutes);

app.use("/authenticate", authenticationRoutes);
app.use("/fileUpload", fileUploadRoute);
app.use("/forumThreads", forumThreadRoute);
app.use("/forumMessages", forumMessageRoute);


database.initDb(function(err, db) {
    if (db) {
        userService.createDefaultAdmin();
        console.log("Anbindung von Datenbank erfolgreich")
    } else {
        console.log("Anbindung von Datenbank gescheitert")
    }
})


const server = https.createServer({ key: key, cert: cert }, app);


app.get('/', (req, res) => { res.send('this is an secure server') });

app.use(function(req, res, next) {
    res.status(404).json({ "Error": "Sorry cant find that url is not supported" });
});

app.use(function(req, res, next) {
    res.status(500).json({ "Error": "Es gab Probleme" });
});

const port = 443;

server.listen(port, () => { console.log(`Example app listening at https://localhost:${port}`) });
