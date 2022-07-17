import { Product } from './../../../shared/models/product';
import { DisplayProduct } from './../../../shared/interfaces/display-product';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CartItem } from 'src/app/shared/models/cart-item';
import { Order } from 'src/app/shared/models/order';
import { OrdersService } from 'src/app/shared/services/orders.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { ProductsService } from 'src/app/shared/services/products.service';

export interface DialogData {
  orderProducts: string;
  orderTotalPrice: DisplayProduct;
}

@Component({
  selector: 'app-orders-view',
  templateUrl: './orders-view.component.html',
  styleUrls: ['./orders-view.component.scss'],
})
export class OrdersViewComponent implements OnInit {
  displayedColumns: string[] = [
    '_id',
    'orderDate',
    'deliveryDate',
    'status',
    'totalPrice',
    'viewOrder',
  ];
  statusArray = [
    { value: 'on process', viewValue: 'On Process' },
    { value: 'shipped', viewValue: 'Shipped' },
    { value: 'delivered', viewValue: 'Delivered' },
  ];
  dataSource!: MatTableDataSource<Order>;
  orders: Order[] = [];
  orderProducts: DisplayProduct[] = [];
  allProducts: Product[] = [];
  user: any;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator | null;
  @ViewChild(MatSort) sort!: MatSort | null;

  constructor(
    private ordersService: OrdersService,
    public dialog: MatDialog,
    private cartService: CartService,
    private productsService: ProductsService
  ) {}
  ngOnInit(): void {
    this.ordersService.getAllOrders().subscribe((result) => {
      this.orders = result;
      this.dataSource = new MatTableDataSource(this.orders);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    this.productsService.getAllProducts().subscribe((data) => {
      this.allProducts = data;
    });
    this.user = JSON.parse(localStorage.getItem('user')!);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    cart: string,
    orderTotalPrice: string
  ): void {
    console.log(cart);
    this.cartService.getCartItemsByCartId(cart).subscribe((cartProducts) => {
      this.orderProducts = this.cartService.prepareToDisplay(
        this.allProducts!,
        cartProducts.products
      );
      this.dialog.open(OrderDetailsDialog, {
        width: '500px',

        // enterAnimationDuration,
        // exitAnimationDuration,
        data: { orderProducts: this.orderProducts, orderTotalPrice },
      });
    });
  }

  updateStatus(docId: String, event: MatSelectChange) {
    // console.log(event);
    console.log(docId);
    const status = event.value;
    this.ordersService.updateOrderStatus(docId, status).subscribe((res) => {
      console.log(res);
    });
  }
}

@Component({
  selector: 'order-details-dialog',
  templateUrl: 'order-details-dialog.html',
})
export class OrderDetailsDialog {
  displayProducts: DisplayProduct[] | undefined;
  constructor(
    public dialogRef: MatDialogRef<OrderDetailsDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
}
