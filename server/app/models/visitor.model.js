/**
 * This schema for visitor online
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VisitorSchema = new Schema({
    ip: {
        type: String,
        unique:true,
        index: true
    },
    lastlogin: {
        type: Date,
        default: Date.now
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
});

const Model = mongoose.model('Visitor', VisitorSchema);
module.exports = Model;