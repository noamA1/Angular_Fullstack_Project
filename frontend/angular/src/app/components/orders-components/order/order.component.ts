import { saveAs } from 'file-saver';
import { OrdersService } from './../../../shared/services/orders.service';
import { Order } from 'src/app/shared/models/order';
import { DisplayProduct } from './../../../shared/interfaces/display-product';
import { Router } from '@angular/router';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import * as moment from 'moment';
import { Address } from 'src/app/shared/interfaces/address';
import { PaymentMethod } from 'src/app/shared/interfaces/payment-method';
import { CartService } from 'src/app/shared/services/cart.service';
import { UserService } from 'src/app/shared/services/user.service';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { FilesHandleService } from 'src/app/shared/services/files-handle.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  minDate: Date | undefined;
  firstFormGroup: FormGroup = this._formBuilder.group({ firstCtrl: [''] });
  selectedShippingDate: Date | undefined;
  allOrdersFromDB: Order[] = [];
  orderTotalPrice: Number | undefined;
  cartId: String | undefined;
  userId: String | undefined;
  newOrder: Order | undefined;

  orderAddress: Address | undefined;
  orderPaymentMethod: PaymentMethod | undefined;
  deliveryDateError: boolean = false;

  addressForm: FormGroup = this._formBuilder.group({
    city: ['', [Validators.required, Validators.pattern('^[a-z|A-Z]*$')]],
    street: ['', [Validators.required, Validators.pattern('^[a-z|A-Z]*$')]],
    house: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    zipCode: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
  });

  paymentForm: FormGroup = this._formBuilder.group({
    cardNumber: ['', [Validators.required, this.cardNumberValidators]],
    valid: ['', [Validators.required, this.expDateValidators]],
    cvv: ['', [Validators.required, Validators.pattern('^[0-9]{3}')]],
  });

  orderProducts: DisplayProduct[] | undefined;
  itemQuantity = new FormControl('', Validators.required);

  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private ordersService: OrdersService,
    private cartService: CartService,
    private userService: UserService,
    private filesService: FilesHandleService,
    public dialog: MatDialog
  ) {
    // this.minDate = new Date();
  }

  date = moment();

  ngOnInit(): void {
    console.log(window.history);
    if (window.history.state.navigationId === 1) {
      this.router.navigate(['/']);
    }
    this.orderProducts = window.history.state.products;
    this.orderTotalPrice = window.history.state.cartTotalPrice;
    this.cartId = window.history.state.cart;
    this.userId = JSON.parse(sessionStorage.getItem('user')!).uid;
    this.userService.getSingleUser(this.userId!).subscribe((user) => {
      this.addressForm.get('city')?.setValue(user.address?.city);
      this.addressForm.get('street')?.setValue(user.address?.street);
      this.addressForm.get('house')?.setValue(user.address?.houseNumber);
      this.addressForm.get('zipCode')?.setValue(user.address?.zipCode);
    });

    this.ordersService.getAllOrders().subscribe((result) => {
      this.allOrdersFromDB = result;
      console.log(this.allOrdersFromDB);
    });
  }

  getErrorMessage(key: string) {
    if (
      this.addressForm.get(key)?.errors?.['required'] ||
      this.paymentForm.get(key)?.errors?.['required']
    ) {
      return 'You must enter a value';
    }

    if (this.addressForm.get(key)?.errors?.['pattern']) {
      if (key === 'city' || key === 'street') {
        return `The ${key} can contain only letters`;
      } else {
        return `The ${key} can contain only numbers`;
      }
    }
    if (key === 'cvv') {
      return 'Please enter a vaild cvv';
    }
    if (key === 'valid') {
      return 'Please enter a vaild expiration date';
    }

    if (key === 'cardNumber') {
      return 'Please enter a vaild card number';
    }

    return;
  }

  expDateValidators(c: FormControl) {
    const monthAndYear = /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/;

    return monthAndYear.test(c.value)
      ? null
      : {
          validateInput: {
            valid: false,
          },
        };
  }

  cardNumberValidators(c: FormControl) {
    const cardNumberPattern =
      /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11})$/;
    const value = c.value as string;

    return cardNumberPattern.test(value.replace(/\s/g, ''))
      ? null
      : {
          validateInput: {
            valid: false,
          },
        };
  }

  setOrderAddress() {
    this.orderAddress = {
      city: this.addressForm.get('city')?.value,
      street: this.addressForm.get('street')?.value,
      houseNumber: this.addressForm.get('house')?.value,
      zipCode: this.addressForm.get('zipCode')?.value,
    };
    console.log(this.orderAddress);
  }

  selectedDate(event: MatDatepickerInputEvent<Date>) {
    let counter = 0;
    this.date = moment(event.value);

    this.selectedShippingDate = new Date(event.value!);
    this.allOrdersFromDB.forEach((order) => {
      if (
        new Date(order.deliveryDate!.toString()).getDate() ===
        this.selectedShippingDate!.getDate()
      ) {
        counter++;
      }
    });

    if (counter >= 3 || !this.selectedShippingDate) {
      this.deliveryDateError = true;
    } else {
      this.deliveryDateError = false;
    }
  }

  setOrderPayment() {
    this.orderPaymentMethod = {
      cardNumber: this.paymentForm.get('cardNumber')?.value,
      expirationDate: this.paymentForm.get('valid')?.value,
      cvv: this.paymentForm.get('cvv')?.value,
    };
    console.log(this.paymentForm.get('cardNumber')?.value);
  }

  openDialog(
    // enterAnimationDuration: string,
    // exitAnimationDuration: string,
    orderId: String
  ): void {
    this.dialog.open(OrderMessageDialog, {
      width: '500px',

      // enterAnimationDuration,
      // exitAnimationDuration,
      data: { orderId },
    });
  }

  submit() {
    this.newOrder = {
      cart: this.cartId!,
      user: this.userId!,
      deliveryDate: this.selectedShippingDate,
      totalPrice: this.orderTotalPrice,
      address: this.orderAddress,
      creditCard: this.orderPaymentMethod,
    };
    this.ordersService.addOrder(this.newOrder).subscribe((result) => {
      console.log(result);
      const order = {
        products: this.orderProducts,
        _id: result._id,
        orderDate: result.orderDate,
        totalPrice: result.totalPrice,
        cardNumber: result.creditCard?.cardNumber,
      };
      this.filesService.createOrderBill(order);
      this.openDialog(result._id!);
    });
    this.cartService.updateCartStatus(this.userId!);
    // this.cartService.creatNewCart(this.userId!).subscribe((result) => {
    //   this.cartService.set(result._id!);
    // });
  }
}

@Component({
  selector: 'order-message-dialog',
  templateUrl: 'order-message-dialog.html',
})
export class OrderMessageDialog {
  constructor(
    public dialogRef: MatDialogRef<OrderMessageDialog>,
    private ordersService: OrdersService,
    private filesService: FilesHandleService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  downloadBill() {
    this.filesService.downloadOrderBill(this.data.orderId).subscribe((data) => {
      const file = new File([data as any], 'name');
      saveAs(file);
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
