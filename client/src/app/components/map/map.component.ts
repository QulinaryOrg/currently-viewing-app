import {Component, OnInit, ChangeDetectorRef} from "@angular/core";
import {ViewersService} from "../viewers/viewers.service";

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  private mapData: any[] = [];
  private centerLat = 1.3;
  private centerLon = 103.4;

  constructor(private viewersService: ViewersService,
              private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.updateMapData();
  }

  updateMapData = () => {
    this.viewersService.getViewers()
      .map(res => res.json())
      .subscribe(
        viewers => {
          this.mapData = viewers.map(v => {
            let [lat, lon] = v.loc.split(',');
            return {ip: v.ip, lat: parseFloat(lat), lon: parseFloat(lon)};
          });
          this.centerLat = this.mapData.reduce((avg, d) => { avg = (d.lat + avg)/this.mapData.length; return avg;}, 0);
          this.centerLon = this.mapData.reduce((avg, d) => { avg = (d.lon + avg)/this.mapData.length; return avg;}, 0);

          this.cd.detectChanges()
        },
        error => console.error(error)
      )
  };
}
