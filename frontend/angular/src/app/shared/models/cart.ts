import { CartItem } from './cart-item';

export class Cart {
  clientId: String = '';
  products: CartItem[] = [];
  openAt: Date | undefined;
}
