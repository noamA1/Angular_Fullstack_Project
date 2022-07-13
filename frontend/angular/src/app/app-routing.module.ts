import { ProductsComponent } from './components/products-components/products/products.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryComponent } from './components/categories/add-category/add-category.component';
import { CategoriesComponent } from './components/categories/categories/categories.component';
import { AddProductComponent } from './components/products-components/add-product/add-product.component';
import { OrderComponent } from './components/orders-components/order/order.component';

const routes: Routes = [
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
      { path: 'add', component: AddProductComponent },
      { path: 'edit', component: AddProductComponent },
      { path: ':categoryName', component: ProductsComponent },
    ],
  },
  { path: 'order', component: OrderComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
