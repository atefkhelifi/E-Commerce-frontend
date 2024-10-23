import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../pages/login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent }, // Route for the login page
];
@Component({
  selector: 'users-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {}
