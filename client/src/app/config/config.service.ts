import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';


@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor() { }

  // URL for server api communication
  api() {
    return 'http://localhost:8080';
  }

  // URL for socket communication
  socket() {
    return io('http://localhost:8080');
  }
}
