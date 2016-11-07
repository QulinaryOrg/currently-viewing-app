var Visitor = require('./models/visitor');

module.exports = function (app) {

    /* Not needed since socket.io is used instead.
    app.post('/api/visitors/delete/:recordId', function (req, res) {
        var recordId = req.params.recordId;
        Visitor.findByIdAndRemove(recordId, function (err) {
            if (err) {
                res.send(err);
            }
            res.json({});
        });
    });

    app.post('/api/visitors/add', function (req, res) {
        var newVisitor = new Visitor({ ip: req.ip });
        newVisitor.save(function (err, doc) {
            if (err) {
                res.send(err);
            }
            res.json(doc);
        });
    });*/

    app.get('/api/visitors', function (req, res) {
        Visitor.find(function (err, visitors) {
            if (err) {
                res.send(err);
            }
            res.json(visitors);
        });
    });

    // Send index.html for root path.
    app.get('/', function (req, res) {
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
    });


};
