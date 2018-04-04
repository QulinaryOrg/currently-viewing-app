const viewer = require("../models/viewers");
const io = require('socket.io')
exports.add = (req, res)=>{
viewer.create(req.body)
.then(result=>{
    let id = result._id;
    viewer.find({}).then(result=>{

        io.on('connection', function (socket) {
            console.log("Io.connected");
            socket.on('viewerData', function(data){
                console.log(data);
            });
        });
       /*  res.json({
            success : true,
            id : id,
            data:result
        }) */

        io.sockets.emit('viewer', {data: result})
    });
})
}

exports.deleteViewer = (req, res)=>{
    console.log("here")
    console.log(req.params.id);
    viewer.findByIdAndRemove(req.params.id, function(err, result){
        if(err){
            res.json({
                success : false,
                message : "Could not delete the viewer"
            })
        }else{

            console.log(result);
            res.json({
                success : true,
                message : "Delete the viewer"
            }) 
        }
    })
    }