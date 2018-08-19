import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { WhoisOnlineComponent } from './whois-online.component';
import { UniquePipe } from '../pipes/unique.pipe';
import { MomentjsPipe } from '../pipes/momentjs.pipe';
import {HttpClient, HttpHandler} from '@angular/common/http';
import { ConfigService} from '../config/config.service';
import { OnlineService } from './online.service';


describe('WhoisOnlineComponent', () => {
  let component: WhoisOnlineComponent;
  let fixture: ComponentFixture<WhoisOnlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        WhoisOnlineComponent,
        UniquePipe,
        MomentjsPipe
      ],
      providers: [ ConfigService, OnlineService, HttpClient, HttpHandler ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhoisOnlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
