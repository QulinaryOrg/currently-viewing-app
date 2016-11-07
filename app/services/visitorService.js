var Visitor = require('../models/visitor');

module.exports = {
    addVisitor: function (clientIpAddress) {
        var newVisitor = new Visitor({ ip: clientIpAddress });
        console.log('Adding visitor with ip: ' + clientIpAddress);
        newVisitor.save(function (err, doc) {
            if (err) {
                console.error(err);
            }
        });
    },
    deleteAll: function () {
        console.log('Deleting all visitors');
        Visitor.remove({}, function (err) {
            if (err) {
                console.error(err);
            }
        });
    },
    deleteVisitor: function (clientIpAddress) {
        console.log('Deleting visitor with ip: ' + clientIpAddress);
        Visitor.findOneAndRemove({ ip: clientIpAddress }, function (err) {
            if (err) {
                console.error(err);
            }
        });
    }
};
