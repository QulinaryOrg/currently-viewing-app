const controller = require('../controllers/visitor.controller');

module.exports = app => {
    app.prefix('/visitors', (visitor) => {
        visitor.route('/').get(controller.allVisitors);
        visitor.route('/').post(controller.addVisitor);
        visitor.route('/:ip').delete(controller.removeVisitor);
    });
};