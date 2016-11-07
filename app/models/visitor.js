var mongoose = require('mongoose');

module.exports = mongoose.model('Visitor', {
    ip : {type : String, default: ''}
});
