"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = require("./server");
var Application = (function (_super) {
    __extends(Application, _super);
    function Application() {
        var _this = _super.call(this) || this;
        _this.list = [];
        return _this;
    }
    Application.prototype.serverReady = function () {
        console.log("server ready");
    };
    Application.prototype.getIp = function (address) {
        var ip = address.split(":");
        return ip[ip.length - 1];
    };
    Application.prototype.onSocketConnect = function (socket) {
        var ip = this.getIp(socket.request.connection.remoteAddress);
        this.list.push(ip);
        socket.on('disconnect', this.onDisconnect.bind(this, ip));
        this.broadcast();
    };
    Application.prototype.onDisconnect = function (ip) {
        var index = this.list.indexOf(ip);
        if (index !== -1) {
            this.list.splice(index, 1);
        }
        this.broadcast();
    };
    Application.prototype.broadcast = function () {
        this.socket.sockets.emit('updateList', this.list);
    };
    return Application;
}(server_1.Server));
exports.Application = Application;
//# sourceMappingURL=application.js.map