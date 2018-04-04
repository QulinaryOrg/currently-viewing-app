//import the dependencies
let express = require("express");
const app = express();
const mongoose = require("mongoose")
var http = require('http').Server(app);
var io = require('socket.io')(http);
const viewer = require("./controllers/viewer");
const config = require("./config/config")
const morgan = require("morgan")
const cors = require('cors')

//Listen for connection
io.on('connection', viewer.respond);

app.use(morgan("dev"));

app.use(cors())


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