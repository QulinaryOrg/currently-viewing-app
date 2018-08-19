import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { WhoisOnlineComponent } from './whois-online/whois-online.component';
import { UniquePipe } from './pipes/unique.pipe';
import { MomentjsPipe } from './pipes/momentjs.pipe';
import { HttpClient, HttpHandler} from '@angular/common/http';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        WhoisOnlineComponent,
        UniquePipe,
        MomentjsPipe
      ],
      providers: [ HttpClient, HttpHandler ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

});
