$( document ).ready(function() {
    var socket = io.connect();
    var viewerList = $("#viewers");

    socket.on('clients', function (data) {
        listUsers(data);
    });
    function listUsers(users) {
        var ul = $('<ul>');
        users.forEach(function (user) {
            var li = $('<li>'+user+'</li>');
            ul.append(li);
        });
        viewerList.html(ul);
        console.log(viewerList);
    }
});