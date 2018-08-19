import { Component, OnInit, HostListener, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import {OnlineService} from './online.service';

import { ConfigService } from '../config/config.service';

@Component({
  selector: 'app-whois-online',
  templateUrl: './whois-online.component.html',
  styleUrls: ['./whois-online.component.scss']
})
export class WhoisOnlineComponent implements OnInit {

  public listIps: any = [];
  private socket: any;

  constructor(
    private online: OnlineService,
    private config: ConfigService
  ) { }

  // Warn visitor when leave application and remove ip
  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHander(event) {

    if (this.removeIp()) {
      return true;
    } else {
      return false;
    }
  }


  ngOnInit() {

    // Get Already visitors info
    this.getIps();

    // Get visitor ip and add to database
    this.online.getIpAddress().subscribe(data => {
      this.addIp(data);
    });

    this.socket = this.config.socket();

    // Get global realtime visitor data when new visitor arrives
    this.socket.on('newvisitor', (data) => {
      this.getIps();
    });

    // Remove visitor ip real-time when a user leave visiting application
    this.socket.on('removevisitor', (data) => {

      if (this.listIps.length > 0) {
        const dd = this.listIps.filter( (d) => {
          if (d._id !== data._id) {
            return d;
          }
        });
        this.listIps = dd;
      }
    });

  }


  /**
   * @function {addIp}
   * @desc Add user ip address
   * @param {object} data - the data object containing values of {ip}
   * @returns {void} assigning ip info object to `listIps`
   */

  addIp(data) {
    this.online.addIp(data).subscribe(result => {
      this.listIps.push(result);
    },
      error => {
      console.error(error);
      });
  }


  /**
   * @function {getIps}
   * @desc Get all visitors ip address from the last 10 minutes
   * @returns {array} assigning array of objects to `listIps`
   */
  getIps() {
    this.online.getIps().subscribe(data => {
      this.listIps = data;
    },
      error => {
      console.error(error);
      });
  }

  /**
   * @function {removeIp}
   * @desc Remove visitor ips address from database when user closes the application window
   * @returns {void}
   */
  removeIp() {
    this.online.getIpAddress().subscribe(data => {

      this.online.removeIp(data).subscribe(result => {
        }, error => {
          console.error(error);
        });
    },
    error => {
      console.error(error);
      });
  }

}
