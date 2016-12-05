require('source-map-support').install();

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import bodyParser from 'body-parser';
import http from 'http';
import morgan from 'morgan';
import * as requestIp from "request-ip";
import * as config from './config';
import {router} from './components/viewers/viewers.route';
import {ViewersService} from "./components/viewers/viewers.service";
const viewersService = new ViewersService();

const app = express();

// Enable CORS
app.use(cors());

// Secure app with helmet
app.use(helmet());

// GZIP all assets
app.use(compression());

// HTTP request log
app.use(morgan('combined'));

// configure body parser
app.use(bodyParser.json({limit: '1mb'}));   // support JSON-encoded bodies
app.use(
    bodyParser.urlencoded(  // support URL-encoded bodies
        {
            extended: true
        }
    )
);

app.get('/healthCheck', function(req, res) {
  console.dir(clients);
  res.send(`Server is up for ${process.uptime()}s`);
});

app.use('/', router);

export const port = config.port || process.env.PORT || 3000;


export const server = http.createServer(app);

export const io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {
  console.log('A client is connected!');
});

io.sockets.on('disconnect', function (socket) {
  console.log('A client is disconnected!');
});

io.on('connection', (socket) => {
  viewersService.addViewer(requestIp.getClientIp(socket.request))
    .then(() => {
      io.emit('VIEWERS_UPDATE');
    });

  socket.on('disconnect', () => {
    viewersService.getViewers({ip: requestIp.getClientIp(socket.request)})
      .then(viewersService.setViewerToOffline)
      .then(viewer => {
        io.emit('VIEWERS_UPDATE');
        res.send(viewer);
      })
  });
});

var clients = io.sockets.clients();
console.log(clients);



server.listen(port);
