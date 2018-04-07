import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private url = '';
  private socket;
  public liveIPs = [];
  constructor() { }

  ngOnInit(): void {
    this.socket = io(this.url);
    this.socket.on('connected', (data) => {
      console.log('connected: ' + JSON.stringify(data));
    });

    this.socket.on('liveUsers', (data) => {
      console.log('live users');
      console.log(data.ips);
      this.liveIPs = data.ips;
    });
  }
}
