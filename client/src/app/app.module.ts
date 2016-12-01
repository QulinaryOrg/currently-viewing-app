import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { ROUTES } from './app.routes';
import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component';
import { LayoutComponent } from './components/layout/layout.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ViewersComponent } from './components/viewers/viewers.component';
import {ViewersService} from "./components/viewers/viewers.service";
import { TimeAgoPipe } from './components/viewers/viewers.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    LayoutComponent,
    DashboardComponent,
    ViewersComponent,
    TimeAgoPipe
  ],
  imports: [
    RouterModule.forRoot(ROUTES, { useHash: true }),
    BrowserModule,
    FormsModule,
    HttpModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB8C9I_bwP9CAEF5qJRTULu3fVDTx1Ht4U'
    })
  ],
  providers: [
    ViewersService
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
