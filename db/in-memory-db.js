module.exports = function Db(){
  var self = this;

  this.ips = {}

  this.init = function(){

  }

  this.addIp = function(ipAddress){
    if(!self.ips.hasOwnProperty(ipAddress)){
      self.ips[ipAddress] = ipAddress;
    }
  }

  this.removeIp = function(ipAddress){
    delete self.ips[ipAddress];
  }

  this.getList = function(){
    var list = [];
    for(let val in self.ips){
      list.push(val);
    }
    return list;
  }
}