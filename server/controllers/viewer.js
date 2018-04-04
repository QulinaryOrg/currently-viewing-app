const viewer = require("../models/viewers");

exports.respond = (socket) => {
    socket.on('viewerData', function (data) {

        console.log(data);
        viewer.create(data)
            .then(result => {
                let id = result._id;

                viewer.find({}).then(result => {
                    socket.emit('viewer', {
                        id,
                        data: result

                    })
                    socket.broadcast.emit('viewer', {
                        data: result
                    })
                });
            });
    });

    socket.on('deleteViewer', function (id) {
        console.log(id);
        viewer.findByIdAndRemove(id, function (err, result) {
            viewer.find({}).then(result => {
                socket.broadcast.emit('viewer', {

                    data: result
                })
            });
        })
    });
}
/* exports.add = (req, res) => {
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
           res.json({
                success : true,
                id : id,
                data:result
            }) 

            io.sockets.emit('viewer', {data: result})
        }); 
    })
     
}

exports.deleteViewer = (req, res) => {
    console.log("here")
    console.log(req.params.id);
    viewer.findByIdAndRemove(req.params.id, function (err, result) {
        if (err) {
            res.json({
                success: false,
                message: "Could not delete the viewer"
            })
        } else {

            console.log(result);
            res.json({
                success: true,
                message: "Delete the viewer"
            })
        }
    })
} */