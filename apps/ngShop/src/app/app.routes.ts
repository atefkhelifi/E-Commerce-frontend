import { Route } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { productsRoutes } from '@frontend/products';
import { ordersRoutes } from '@frontend/orders';
import { usersRoutes } from '@frontend/users';

export const appRoutes: Route[] = [
  ...usersRoutes,
  ...productsRoutes,
  ...ordersRoutes,
  { path: '', component: HomePageComponent },
  // { path: 'products', component: ProductListComponent },
  {
    path: '**',
    redirectTo: '',
  },
];
