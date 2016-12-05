// Imports from @angular
import { Routes } from '@angular/router';
// Router Components
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ViewersComponent } from './components/viewers/viewers.component';
import {MapComponent} from "./components/map/map.component";

export const ROUTES: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'viewers', component: ViewersComponent },
  { path: 'map', component: MapComponent },
];
