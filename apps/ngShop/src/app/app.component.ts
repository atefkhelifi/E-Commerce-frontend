import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { BannerComponent } from '@frontend/ui';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

@Component({
  standalone: true,
  imports: [
    NxWelcomeComponent,
    StoreModule,
    EffectsModule,
    RouterOutlet,
    HomePageComponent,
    FooterComponent,
    HeaderComponent,
    BannerComponent,
  ],

  selector: 'ngshop-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'ngShop';
}
