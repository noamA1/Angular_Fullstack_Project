import { Address } from '../interfaces/address';
import { PaymentMethod } from '../interfaces/payment-method';

export class Order {
  cart: String = '';
  orderDate?: Date | undefined;
  deliveryDate: Date | undefined;
  totalPrice: Number | undefined;
  creditCard: PaymentMethod | undefined;
  // | {
  //     cardNumber: String;
  //     expirationDate: String;
  //     cvv: String;
  //   }
  // | undefined;
  status?: String = '';
  user: String = '';
  address: Address | undefined;
  // | {
  //     city: String;
  //     street: String;
  //     houseNumber: Number;
  //     zipCode: Number;
  //   }
  // | undefined;
}
