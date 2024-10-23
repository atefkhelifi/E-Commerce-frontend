import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { LoginComponent, UsersComponent } from '@frontend/users';
import { appRoutes } from './app.routes';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

@Component({
  standalone: true,
  imports: [
    NxWelcomeComponent,
    RouterOutlet,
    UsersComponent,
    LoginComponent,
    DashboardComponent,
  ],
  selector: 'admin-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'admin';
}
