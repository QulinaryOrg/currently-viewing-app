import {Component, OnInit, ChangeDetectorRef} from "@angular/core";
import {ViewersService} from "../viewers/viewers.service";

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  private mapData: any[] = [];

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
          this.cd.detectChanges()
        },
        error => console.error(error)
      )
  };
}
