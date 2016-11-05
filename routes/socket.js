//To Create an IP Object
var ipObjectList = [];

var ipObject = function(ip){
  this.ip = ip;
  this.history = [];
  ipObjectList.push(this);
}
ipObject.prototype.addEntry = function(){
  var d = new Date().toISOString().slice(0,19).replace(/T/g,"_").replace(/:/g,"-"); //'2016-11-03_19-12-46'
  this.history.push(d);
}


// export function for listening to the socket
module.exports = function (socket) {
  var name = socket.handshake.address; //client ip address
  var ipObject = createIpObject(name);

  // send the new user their name and a list of users
  socket.emit('init', {
    ipObject: ipObject,
    ipObjectList: ipObjectList
  });

  // notify other clients that a new user has joined
  socket.broadcast.emit('user:join', {
    ipObject: ipObject
  });

  // clean up when a user leaves, and broadcast it to other users
  socket.on('disconnect', function () {
    socket.broadcast.emit('user:left', {
      ipObject: ipObject
    });
    free(ipObject);
  });
};


// Private helpers
// ===============
  
//remove ip from lists
var free = function (name) {
  if (ipObjectList[name]) {
    delete ipObjectList[name];
  }
};

//return the ip object (with that IP) or generates a new one
function createIpObject(ip){
  for (var i = 0; i < ipObjectList.length; i++) {
    if(ipObjectList[i].ip == ip){
      ipObjectList[i].addEntry();
      return ipObjectList[i];
    }
  };
  var entry = new ipObject(ip);
  entry.addEntry();
  return entry;
}