import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatToolbarModule, MatIconModule],
  template: `
  <mat-toolbar color="primary" style="--mdc-theme-primary:#1f2a5a">
     Weather Dashboard
  </mat-toolbar>
  <router-outlet />
  `
})
export class AppComponent { theme = signal('dark'); }
