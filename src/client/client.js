(function () {
  'use strict';
  var socket = io();

//  var source = document.getElementById('ipListTemplate').innerHTML;
  var template = CurrentlyViewingApp.templates.ipListTemplate;//Handlebars.compile(source);

  socket.on('update_ip_list', function (msg) {
    var context = {};
    context.connections = _.map(msg, function (cnt, ip) {
      return {ip: ip, cnt: cnt};
    });
    var html = template(context);
    document.getElementById('res').innerHTML = html;
  });
})();
