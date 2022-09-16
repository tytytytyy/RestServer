var mongoose = require("mongoose");
const config = require("config");

let _db;

const connectionString = config.get('db.connectionString');

function initDb(callback) {
    if (_db) {
        if (callback) {
            return callback(null, _db);
        } else {
            return _db;
        }
    } else {

        mongoose.connect(config.db.connectionString, config.db.connectionOptions, connected);

        function connected(err, db) {
            if (err) {
                return callback(err);
            }
            console.log("DB initialized - connected to: " + config.db.connectionString.split("@")[1]);
            _db = db;
            return callback(null, _db);
        }
    }
}


function getDb() {
    return _db;
}



module.exports = {
    getDb,
    initDb
};