import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

@Component({
  selector: 'admin-shell',
  standalone: true,
  imports: [SidebarComponent, RouterModule],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss',
})
export class ShellComponent {}
