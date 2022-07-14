import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { HeaderComponent } from './components/layout/header/header.component';
import { NavBarComponent } from './components/layout/nav-bar/nav-bar.component';
import { HttpClientModule } from '@angular/common/http';
import { FileUploadModule } from 'ng2-file-upload';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoriesComponent } from './components/categories/categories/categories.component';
import { AddCategoryComponent } from './components/categories/add-category/add-category.component';
import { ProductsComponent } from './components/products-components/products/products.component';
import { AddProductComponent } from './components/products-components/add-product/add-product.component';
import { CartComponent } from './components/cart-components/cart/cart.component';
import { CartProductsComponent } from './components/cart-components/cart-products/cart-products.component';
import { ProductCardComponent } from './components/products-components/product-card/product-card.component';
import { OrderComponent } from './components/orders-components/order/order.component';
import { OrderItemComponent } from './components/orders-components/order-item/order-item.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { CreditCardDirective } from './shared/directives/credit-card.directive';
import { ExpirationDateDirective } from './shared/directives/expiration-date.directive';
import { PhoneNumberDirective } from './shared/directives/phone-number.directive';
import {
  OrderDetailsDialog,
  OrdersViewComponent,
} from './components/orders-components/orders-view/orders-view.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavBarComponent,
    CategoriesComponent,
    AddCategoryComponent,
    ProductsComponent,
    AddProductComponent,
    CartComponent,
    CartProductsComponent,
    ProductCardComponent,
    OrderComponent,
    OrderItemComponent,
    CreditCardDirective,
    ExpirationDateDirective,
    PhoneNumberDirective,
    OrdersViewComponent,
    OrderDetailsDialog,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    FileUploadModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
