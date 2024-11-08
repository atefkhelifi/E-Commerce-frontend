import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { LoginComponent, UsersComponent, UsersService } from '@frontend/users';
import { appRoutes } from './app.routes';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { StoreModule } from '@ngrx/store';
// eslint-disable-next-line @nx/enforce-module-boundaries

@Component({
  standalone: true,
  imports: [
    NxWelcomeComponent,
    RouterOutlet,
    UsersComponent,
    LoginComponent,
    DashboardComponent,
  ],
  providers: [UsersService, StoreModule],

  selector: 'admin-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'admin';
}
