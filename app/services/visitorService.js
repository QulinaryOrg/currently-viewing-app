var Visitor = require('../models/visitor');

module.exports = {
    addVisitor: function (clientIpAddress) {
        var newVisitor = new Visitor({ ip: clientIpAddress });
        newVisitor.save(function (err, doc) {
            if (err) {
                console.error(err);
            }
        });
    },
    deleteAll: function () {
        Visitor.remove({}, function (err) {
            if (err) {
                console.error(err);
            }
        });
    },
    deleteVisitor: function (clientIpAddress) {
        Visitor.findOneAndRemove({ ip: clientIpAddress }, function (err) {
            if (err) {
                console.error(err);
            }
        });
    }
};
