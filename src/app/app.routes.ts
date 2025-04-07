import { Routes } from '@angular/router';
import { shopRoutes } from '../features/shop/shop.routes';
import { checkoutRoutes } from '../features/checkout/checkout.routes';
import { adminRoutes } from '../features/admin/admin.routes';
import { productDetailRoutes } from '../features/product-detail/product-detail.routes';

export const routes: Routes = [
  { path: '', children: shopRoutes },
  { path: 'checkout', children: checkoutRoutes },
  { path: 'admin', children: adminRoutes },
  { path: 'product/:id', children: productDetailRoutes },
  { path: '**', redirectTo: '' }
];