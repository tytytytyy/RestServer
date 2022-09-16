const express = require('express');
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



const app = express()

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
app.use("/forumMessage", forumMessageRoute);



database.initDb(function(err, db) {
    if (db) {
        userService.createDefaultAdmin();
        console.log("Anbindung von Datenbank erfolgreich")
    } else {
        console.log("Anbindung von Datenbank gescheitert")
    }
})

app.use(function(req, res, next) {
    res.status(404).send("Sorry cant find that url is not supported");
});

app.use(function(req, res, next) {
    res.status(500).send("Something went wrong!");
});

const port = 8080

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})