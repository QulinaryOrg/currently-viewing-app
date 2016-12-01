import {Component, OnDestroy} from "@angular/core";
import {ViewersService} from "./components/viewers/viewers.service";
import {host} from "../config";
import {ViewersComponent} from "./components/viewers/viewers.component";
const socket = require('socket.io-client')('http://localhost:3000');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ViewersComponent]
})
export class AppComponent implements OnDestroy {
  title = 'app works!';

  constructor(private viewersService: ViewersService,
              private viewersComponent: ViewersComponent) {
    socket.on('connect', this.socketConnect);
    socket.on('VIEWERS_UPDATE', this.socketUpdate);
    socket.on('disconnect', this.socketDisconnect);
  }

  ngOnDestroy(): void {
    this.socketDisconnect();
  }

  socketConnect = () => {
    this.viewersService.viewerOnline()
      .map(res => res.json())
      .subscribe(
        (response) => {
          console.log(`Your IP ${response[0].ip} is online.`)
        },
        (error) => console.error(error)
      )
  };

  socketDisconnect = () => {
    this.viewersService.vieweerOffline()
      .map(res => res.json())
      .subscribe(
        (response) => {
          console.warn(`Your IP ${response['ip']} is offline.`)
        },
        (error) => console.error(error)
      )
  };

  socketUpdate = () => {
    this.viewersComponent.viewersUpdate();
  };
}
