const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LiveUsers = new Schema({
    ip: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("liveUsers", LiveUsers)