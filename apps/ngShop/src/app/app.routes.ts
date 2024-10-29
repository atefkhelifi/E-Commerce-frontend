import { Route } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { productsRoutes } from '@frontend/products';

export const appRoutes: Route[] = [
  ...productsRoutes,
  { path: '', component: HomePageComponent },
  // { path: 'products', component: ProductListComponent },
  {
    path: '**',
    redirectTo: '',
  },
];
