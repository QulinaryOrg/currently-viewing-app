const Visitor = require('./../models/visitor.model');

/**
 * @function {allVisitors}
 * @desc Get all Visitors ip information for the last 30 mins default
 * @param {number} time - send the minutes as query param for getting information for the last particular minutes {time=10}
 * @returns {array} return array of objects with updated ip information
 */
exports.allVisitors = (req, res)=> {

    let min = req.query.time || 30;
    const timeAgo = new Date(new Date().getTime() - 1000 * 60 * min);

    Visitor.find({
        lastlogin: {$gt: timeAgo}

    }).exec(function(err,result){
        if(err) {
            res.status(401).send(err);
        } else {
            res.send(result);
        }
    });

};


/**
 * @function {addVisitor}
 * @desc add ip information of a visitor to database. It also emit socket event to inform all the current visitor about the new visitor information in real-time
 * @param {object} req.body - send user information  as object with request body.
 * @event {object| eventEmiter} `newvisitor` - This event name send information to client side to update real-time.
 * @returns {object} return object with updated ip information
 */
exports.addVisitor = (req, res)=> {
    const io = req.app.get('socketio');

    const ip = req.body.ip;
    Visitor.findOne({ip: ip}).exec((err, info)=>{
        if (err){
            res.status(400).send(err);
        } else {
            if(!info) {
                let newobj = new Visitor({
                    ip: ip
                });
                newobj.save((err,result)=> {
                    if (err) {
                        res.status(400).send(err);
                    } else {

                        io.on('connection',()=>{
                             io.emit('newvisitor',result);
                            //socket.emit('newvisitor',result);
                        });

                        res.send(result);
                    }
                });

            } else {

                info.lastlogin = new Date();
                info.save((err,result)=> {
                    if (err) {
                        res.status(400).send(err);
                    } else {

                        io.on('connection',()=>{
                            io.emit('newvisitor',result);
                            //socket.emit('newvisitor',result);
                        });

                        res.send(result);
                    }
                });
            }

        }
    });


};


/**
 * @function {removeVisitor}
 * @desc remove ip information of a visitor from the  database. It also emit socket event to inform all the current visitor to remove the visitor information in real-time
 * @param {object} req.body - send user information  as object with request body.
 * @event {object| eventEmiter} `removevisitor` - This event name sends information to the client-side to update in real-time.
 * @returns {object} return object with deleted ip information
 */
exports.removeVisitor = (req, res)=> {
    const io = req.app.get('socketio');

    const ip = req.params.ip;
    Visitor.findOneAndRemove({ip:ip}).exec((err,result)=>{
        if (err) {
            res.status(400).send(err);
        } else {
            io.on('connection',()=>{
                io.emit('removevisitor',result);
            });
            res.send(result);
        }
    });
};



module.exports = exports;