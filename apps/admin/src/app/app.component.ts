import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { LoginComponent, UsersComponent } from '@frontend/users';

@Component({
  standalone: true,
  imports: [NxWelcomeComponent, RouterModule, UsersComponent, LoginComponent],
  selector: 'admin-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'admin';
}
