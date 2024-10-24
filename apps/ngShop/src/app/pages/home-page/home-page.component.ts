import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from '@frontend/ui';
import { CategoriesBannerComponent } from '@frontend/products';

@Component({
  selector: 'ngshop-home-page',
  standalone: true,
  imports: [CommonModule, BannerComponent, CategoriesBannerComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {}
