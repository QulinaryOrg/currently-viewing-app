import Q from "q";
import * as geoip from "geoip-lite";
import * as ipaddr from "ipaddr.js";
import {Viewers} from "../../models/Viewers";
export const debug = require('debug')('taro:viewers.service');

export class ViewersService {
  constructor() {

  }

  getViewers(condition = {}) {
    return Q.ninvoke(Viewers, 'find', condition);
  }

  addViewer(ip) {
    if (!ipaddr.isValid(ip))
      return Q.reject('invalid ip');

    const geo = geoip.lookup(ip);

    return this.getViewers({ip: ip})
      .then(viewers => viewers && viewers.length
        ? this.setViewerToOnline(viewers)
        : this.saveViewer(ip, geo))
      .then(Q.allSettled(promises => {
          promises.map(result => Q.resolve(result.value))
        }
      ))
  }

  setViewerToOnline(viewers) {
    return Q.all(viewers.map((viewer) => {
      viewer.online = true;
      return Q.ninvoke(viewer, 'save');
    }))
  }

  setViewerToOffline(viewers) {
    return Q.all(viewers.map((viewer) => {
      viewer.online = false;

      return Q.ninvoke(viewer, 'save');
    }))
  }

  saveViewer = (ip, geo, online = true) => {
    Q.ninvoke(Viewers, 'create', {
      ip: ip,
      country: geo.country,
      region: geo.region,
      city: geo.city,
      loc: geo.ll
    })
  }

}

export default ViewersService;
