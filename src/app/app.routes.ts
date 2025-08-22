import { Routes } from '@angular/router';
import { AppComponent } from './app';
import { DashboardComponent } from './features/dashboard.component';

export const routes: Routes = [
{ path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: '**', redirectTo: 'dashboard' }
];
