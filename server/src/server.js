"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http = require("http");
var socketIO = require("socket.io");
var Server = (function () {
    function Server() {
        this.application = null;
        this.server = null;
        this.socket = null;
        this.server = http.createServer();
        this.socket = new socketIO(this.server, { transports: ['websocket', 'polling'] });
        this.socket.on('connection', this.onSocketConnect.bind(this));
    }
    Server.prototype.listen = function () {
        var _this = this;
        this.server.listen(4001, function () {
            var host = (_this.server.address().address == '::') ? '127.0.0.1' : _this.server.address().address;
            var port = _this.server.address().port;
            var family = _this.server.address().family;
            console.log("Application started. listening on: //%s:%s | %s", host, port, family);
            _this.serverReady();
        });
    };
    Server.prototype.serverReady = function () { };
    Server.prototype.onSocketConnect = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    return Server;
}());
exports.Server = Server;
//# sourceMappingURL=server.js.map