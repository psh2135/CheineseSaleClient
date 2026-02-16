import { Routes } from '@angular/router';
import { ProductListComponent } from './features/products/product-list/product-list.js'
import { CartPageComponent } from './features/cart/cart-page/cart-page';
import { LoginComponent } from './features/auth/login/login';
import { RegisterComponent } from './features/auth/register/register';
import { UserProfileComponent } from './features/profile/user-profile/user-profile.js';
import { AdminDashboardComponent } from './features/admin/dashboard/dashboard';
import { AdminDonorsComponent } from './features/admin/donors/donors';

export const routes: Routes = [
  {
    path: '',
    component: ProductListComponent
    // loadComponent: () => import('./features/products/product-list/product-list.js').then(m => m.ProductListComponent) 
  },
  { path: 'cart', component: CartPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: UserProfileComponent },
 
  { path: 'admin/dashboard', component: AdminDashboardComponent },
  { path: 'admin/donors', component: AdminDonorsComponent },


];




