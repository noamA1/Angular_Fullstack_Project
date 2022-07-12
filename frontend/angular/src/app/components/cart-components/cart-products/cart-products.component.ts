import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-cart-products',
  templateUrl: './cart-products.component.html',
  styleUrls: ['./cart-products.component.scss'],
})
export class CartProductsComponent implements OnInit {
  @Input() displayProduct: any;
  @Output() removeItem = new EventEmitter<any>();

  constructor(private cartsService: CartService) {}

  ngOnInit(): void {}

  deleteCartItem(docId: String) {
    this.cartsService.deleteItem(docId).subscribe((result) => {
      this.removeItem.emit();
      this.cartsService.refreshData();
      console.log(result);
    });
  }
}
