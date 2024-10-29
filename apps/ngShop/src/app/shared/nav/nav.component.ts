import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'ngshop-nav',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent {}
