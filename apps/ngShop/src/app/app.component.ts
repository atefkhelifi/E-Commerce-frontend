import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { BannerComponent } from '@frontend/ui';

@Component({
  standalone: true,
  imports: [
    NxWelcomeComponent,

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
