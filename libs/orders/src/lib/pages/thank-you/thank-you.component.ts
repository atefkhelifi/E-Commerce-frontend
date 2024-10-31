import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'users-thank-you',
  standalone: true,
  imports: [ButtonModule, RouterLink],
  templateUrl: './thank-you.component.html',
  styleUrl: './thank-you.component.scss',
})
export class ThankYouComponent {}
