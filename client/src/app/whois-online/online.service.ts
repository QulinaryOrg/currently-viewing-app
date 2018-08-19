import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root'
})
export class OnlineService {

  constructor(
    public http: HttpClient,
    private config: ConfigService
  ) { }


  /**
   * @function {getIpAddress}
   * @desc Get visitor ip information with the help of `jsonip.com`
   * @returns {object} return object with visitor ip information
   */

  getIpAddress() {
    return this.http
      .get('https://jsonip.com')
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * @function {handleError}
   * @desc Error handler for rest call
   * @param {error} error response received for server
   * @returns {object} return error information status
   */

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }

  /**
   * @function {addIp}
   * @desc Add user ip address into the database
   * @param {object} data - the data object containing values of {ip}
   * @returns {object} return object with updated ip info
   */
  addIp(data) {
    return this.http.post(this.config.api() + '/visitors', data)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * @function {getIps}
   * @desc Get all visitors ip information based on last 30  minutes default
   * @returns {array} return array of objects regarding ip information
   */

  getIps() {
    return this.http.get(this.config.api() + '/visitors')
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * @function {removeIp}
   * @desc Remove visitor ip information from the ip list of database
   * @param {object} data - the data object containing values of {ip}
   * @returns {object} return object with deleted ip info
   */

  removeIp(data) {
    return this.http.delete(this.config.api() + `/visitors/${data.ip}`)
      .pipe(
        catchError(this.handleError)
      );
  }
}
