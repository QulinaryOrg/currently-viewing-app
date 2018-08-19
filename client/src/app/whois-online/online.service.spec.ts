import { TestBed, inject } from '@angular/core/testing';

import { OnlineService } from './online.service';
import { HttpClient, HttpHandler} from '@angular/common/http';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { UniquePipe} from '../pipes/unique.pipe';

describe('OnlineService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OnlineService, HttpClient, HttpHandler, UniquePipe]
    });
  });


  it('should be created OnlineService',
    inject([OnlineService, HttpClient], (service: OnlineService) => {
    expect(service).toBeTruthy();
  }));



  it('Service {getIpAddress} function should return visitor own ip address of network',
    inject([OnlineService, HttpClient], (service: OnlineService) => {
    service.getIpAddress().subscribe((data) => {
      expect(typeof data === 'object').toBe(true);
    });
  }));



  it('Service {getIps} function should return visitors ip Addresses as array',
    inject([OnlineService, HttpClient], (service: OnlineService) => {
    service.getIps().subscribe((data) => {
      expect(Array.isArray(data)).toBe(true);
    });
  }));



  it('Service {addIp} function should add visitor ip address to database',
    inject([OnlineService, HttpClient], (service: OnlineService) => {
  const ip = '192.208.45.67';
    service.addIp({ip: ip}).subscribe( (data) => {
      expect(typeof data === 'object').toBe(true);
    });
  }));

});


describe('Remove IP', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OnlineService, HttpClient, HttpHandler, UniquePipe]
    });
  });


  it('Service {removeIp} function should remove visitor ip address from database',
    inject([OnlineService, HttpClient], (service: OnlineService) => {

    const ip = '192.208.45.67';

    service.addIp({ip: ip}).subscribe( (data) => {
    service.removeIp({ip: ip}).subscribe((result) => {
        expect(typeof result === 'object').toBe(true);
      });
    });

  }));

});
