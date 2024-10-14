import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { BannerComponent } from 'libs/ui/src/lib/banner/banner.component';

@Component({
  standalone: true,
  imports: [
    NxWelcomeComponent,

    RouterModule,
    HomePageComponent,
    FooterComponent,
    HeaderComponent,
    BannerComponent,
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'ngShop';
}
