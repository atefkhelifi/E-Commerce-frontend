import { Route } from '@angular/router';
import { OrdersComponent } from './orders/orders.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';

export const ordersRoutes: Route[] = [
  { path: 'cart', component: CartPageComponent },
];
