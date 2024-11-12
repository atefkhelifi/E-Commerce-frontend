import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

// const routes: Routes = [
//   { path: 'login', component: LoginComponent }, // Route for the login page
// ];
@Component({
  selector: 'users-users',
  standalone: true,
  imports: [CommonModule, StoreModule, EffectsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {}
