var Visitor = require('./models/visitor');

module.exports = function (app) {
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
