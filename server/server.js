//import the dependencies
let express = require("express");
const app = express();
const mongoose = require("mongoose")
var http = require('http').Server(app);
var io = require('socket.io')(http,  {
    'pingTimeout':60000,
    'transports':['xhr-polling','polling', 'websocket', 'flashsocket'],
    'pingInterval':25000,
    'allowUpgrades':true,
    'cookie':'io'
});
const viewer = require("./controllers/viewer");
const config = require("./config/config")
const morgan = require("morgan")
const cors = require('cors')

app.use(cors())
//Listen for connection

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
io.on('connection', viewer.respond);

app.use(morgan("dev"));




/* 
//This is no longer neccessary as we are using websockets now
app.use(express.json());
app.use(express.urlencoded({
    extended: true
})); */

//Database connection
mongoose.connect(config.mongoDb, (err) => {
    if (err) {
        throw err;
        system.exit(0)
    } else {
        console.log("Connected to database")
    }
})

//app.post("/api/add", viewer.add);
//app.delete("/api/delete/:id", viewer.deleteViewer);

//Start the server
http.listen(config.port, () => {
    console.log("Successfully connected on port ", config.port);
})