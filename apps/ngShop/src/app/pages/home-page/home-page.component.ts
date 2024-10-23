import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from '../../../../../../libs/ui/src/lib/banner/banner.component';

@Component({
  selector: 'ngshop-home-page',
  standalone: true,
  imports: [CommonModule, BannerComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {}
