var bCrypt = require('bcrypt-nodejs');

var utils = {};

utils.isValidPassword = function(user, password){
    return bCrypt.compareSync(password, user.password);
};
// Generates hash using bCrypt
utils.createHash = function(password){
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};

module.exports = utils;