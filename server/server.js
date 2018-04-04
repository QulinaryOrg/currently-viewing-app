let express = require("express");
const app = express();
const mongoose = require("mongoose")

const config = require("./config/config")
const viewer = require("./controllers/viewer")
const morgan = require("morgan")

const cors = require('cors')

app.use(morgan("dev"));

app.use(cors())


app.use(express.json());
app.use(express.urlencoded({extended:true}));

mongoose.connect(config.mongoDb, (err)=>{
    if(err){
        throw err;
        system.exit(0)
    }else{
        console.log("Connected to database")
    }
})

app.post("/api/add", viewer.add);
app.delete("/api/delete/:id", viewer.deleteViewer);

app.listen(config.port, ()=>{
console.log("Successfully connected on port ", config.port);
})

