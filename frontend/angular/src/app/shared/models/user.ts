import { Order } from './order';
export class User {
  _id: String | undefined;
  userId: String | undefined;
  firstName: String | undefined;
  lastName: String | undefined;
  phone: String | undefined;
  email: String | undefined;
  orders?: Order[] | undefined;
  role: String | undefined;
  address:
    | {
        city: String;
        street: String;
        house: Number;
        zipCode: Number;
      }
    | undefined;
}
