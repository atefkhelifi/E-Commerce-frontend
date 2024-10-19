import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { AuthService } from '@frontend/users';

@Component({
  selector: 'admin-sidebar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  constructor(private auth: AuthService) {}
  logoutUser() {
    this.auth.logout();
  }
}
