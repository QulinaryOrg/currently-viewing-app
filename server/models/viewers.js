let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let viewerSchema = new Schema({
    ip: { type:String, required:true},
    country: String,
    region : String,
    city : String,
    timeZone : String,
    latitude : String,
    longitude : String,
    browser : String
})

module.exports = mongoose.model("Viewers", viewerSchema)