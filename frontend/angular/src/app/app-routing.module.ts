import { VerifyEmailComponent } from './components/auth-components/verify-email/verify-email.component';
import { ProductsComponent } from './components/products-components/products/products.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryComponent } from './components/categories/add-category/add-category.component';
import { CategoriesComponent } from './components/categories/categories/categories.component';
import { AddProductComponent } from './components/products-components/add-product/add-product.component';
import { OrderComponent } from './components/orders-components/order/order.component';
import { OrdersViewComponent } from './components/orders-components/orders-view/orders-view.component';
import { LoginComponent } from './components/auth-components/login/login.component';
import { ForgotPasswordComponent } from './components/auth-components/forgot-password/forgot-password.component';
import { RegistrationComponent } from './components/auth-components/registration/registration.component';
import { ProfileComponent } from './components/user-components/profile/profile.component';
import { EditProfileComponent } from './components/user-components/edit-profile/edit-profile.component';

const routes: Routes = [
  { path: '', component: CategoriesComponent },
  {
    path: 'categories',
    children: [
      {
        path: '',
        component: CategoriesComponent,
      },
      { path: 'add', component: AddCategoryComponent },
      { path: 'edit', component: AddCategoryComponent },
    ],
  },
  {
    path: 'products',
    children: [
      { path: '', component: ProductsComponent },
      { path: 'add', component: AddProductComponent },
      { path: 'edit', component: AddProductComponent },
      { path: ':categoryName', component: ProductsComponent },
    ],
  },
  // { path: 'order', component: OrderComponent },
  {
    path: 'orders',
    children: [
      { path: '', component: OrdersViewComponent },
      { path: 'add', component: OrderComponent },
    ],
  },
  {
    path: 'authentication',
    children: [
      { path: 'log-in', component: LoginComponent },
      { path: 'registration', component: RegistrationComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
      { path: 'verification', component: VerifyEmailComponent },
    ],
  },

  {
    path: 'profile',
    children: [
      { path: '', component: ProfileComponent },
      { path: 'edit', component: EditProfileComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
