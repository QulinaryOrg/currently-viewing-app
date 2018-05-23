import * as http from 'http';
import * as socketIO from 'socket.io';

export class Server
{
    server: any = null;
    socket: any = null;

    constructor() {
        this.server = http.createServer();

        this.socket = new socketIO(this.server, { transports: ['websocket', 'polling'] });
        this.socket.on('connection', this.onSocketConnect.bind(this));
    }

    listen() {
        this.server.listen(4001, () =>
        {
            var host = (this.server.address().address == '::') ? '127.0.0.1' : this.server.address().address;
            var port = this.server.address().port;
            var family = this.server.address().family;

            console.log('Application started. listening on: //%s:%s | %s', host, port, family);
            this.serverReady();
        });
    }

    serverReady(){}
    onSocketConnect(...args){}
}