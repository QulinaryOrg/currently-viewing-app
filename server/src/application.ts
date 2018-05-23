import {Server} from './server';
import { Socket } from 'net';

export class Application extends Server
{
    list: Array<any>;
    constructor() {
        super();
        this.list = [];
    }
    
    getIp(address:string) {
        let ip = address.split(':');
        return ip[ip.length-1]
    }

    //- events -//
    onSocketConnect(socket) {
        let ip = this.getIp(socket.request.connection.remoteAddress);
        this.list.push(ip);

        socket.on('disconnect', this.onDisconnect.bind(this, ip));
        this.broadcast();
    }
    
    onDisconnect(ip) {
        let index = this.list.indexOf(ip);
        if(index !== -1) {
            this.list.splice(index, 1);
        }
        this.broadcast();
    }

    broadcast() {
        this.socket.sockets.emit('updateList', this.list);
    }

    serverReady() {
        //for anything depends on server ready state
        console.log('server ready');
    }
}
