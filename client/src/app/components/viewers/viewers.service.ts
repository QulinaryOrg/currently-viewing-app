import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { host } from '../../../config';

@Injectable()
export class ViewersService {
  private endpoint = `${host}/viewers`;

  constructor(private http: Http) {
  }

  public getViewers() {
    return this.http.get(this.endpoint);
  }

  public viewerOnline() {
    return this.http.post(this.endpoint, {});
  }

  public vieweerOffline() {
    return this.http.delete(this.endpoint);
  }
}
