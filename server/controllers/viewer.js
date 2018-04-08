//import the viewers model
const viewer = require("../models/viewers");
const viewerList = [];

//respond to sockets connection and data communication
exports.respond = (socket) => {
    socket.on('viewerData', function (data) {

       // console.log(data);
       //Save the data to the database.
        viewer.create(data)
            .then(result => {
                let id = result._id;
                viewerList.push[{id, socket}];

                console.dir(viewerList);
            //find all the currently connected viewers in the database
                viewer.find({}).then(result => {
            //send id and result to the connected socket
                   
                    socket.emit('viewer', {
                        id,
                        data: result

                    })
            //broadcast the data of connected users to all the connected sockets
                    socket.broadcast.emit('viewer', {
                        data: result
                    })
                });
            });
    });
    //delete viewers from database when the stop viewing the application
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

/* 
//no longer neccessary as we are using websockets
exports.add = (req, res) => {
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