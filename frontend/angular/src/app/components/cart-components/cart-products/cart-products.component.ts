import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Product } from 'src/app/shared/models/product';
import { CartService } from 'src/app/shared/services/cart.service';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-cart-products',
  templateUrl: './cart-products.component.html',
  styleUrls: ['./cart-products.component.scss'],
})
export class CartProductsComponent implements OnInit {
  @Input() displayProduct: any;
  // @Input() id: String | undefined;
  // @Input() productId: String | undefined;
  // @Input() price: Number | undefined;
  // @Input() image: String | undefined;
  // @Input() totalPrice: Number | undefined;
  // name: String | undefined;
  // allProducts: Product[] | undefined;
  // quantity: FormControl = new FormControl();

  constructor(
    private productsService: ProductsService,
    private cartsService: CartService
  ) {}

  // findProductDetails() {
  //   const cartProductDetails = this.allProducts?.find(
  //     (product) => product._id === this.productId
  //   );
  //   this.price = cartProductDetails?.price;
  //   this.image = cartProductDetails?.image;
  //   this.name = cartProductDetails?.name;
  //   // this.productQuantity = this.quantity
  // }

  ngOnInit(): void {
    // this.quantity = this.productQuantity
    // this.productsService.getAllProducts().subscribe((result) => {
    //   this.allProducts = result;
    //   this.findProductDetails();
    // });
  }

  deleteCartItem(docId: String) {
    this.cartsService.deleteItem(docId).subscribe((result) => {
      console.log(result);
    });
  }
}
