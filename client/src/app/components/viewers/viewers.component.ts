import {Component, OnInit, ChangeDetectorRef} from "@angular/core";
import "rxjs/add/operator/map";
import {ViewersService} from "./viewers.service";
const socket = require('socket.io-client')('http://localhost:3000');

@Component({
  selector: 'viewers',
  templateUrl: './viewers.component.html',
  styleUrls: ['./viewers.component.css']
})
export class ViewersComponent implements OnInit {
  public viewers: any[] = [];

  constructor(private viewersService: ViewersService,
              private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.viewersUpdate();
    socket.on('VIEWERS_UPDATE', this.socketUpdate);
  }

  viewersUpdate = () => {
    this.viewersService.getViewers()
      .map(res => res.json())
      .subscribe(
        response => {
          this.viewers = response;
          this.cd.detectChanges()
        },
        error => console.error(error)
      )
  };

  socketUpdate = () => {
    this.viewersUpdate();
  };
}
