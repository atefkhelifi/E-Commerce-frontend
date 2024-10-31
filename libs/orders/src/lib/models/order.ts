import { OrderItem } from './order-item';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { User } from '../../../../users/src/lib/models/user';

export class Order {
  id?: string;
  orderItems?: OrderItem[];
  shippingAddress1?: string;
  shippingAddress2?: string;
  city?: string;
  zip?: string;
  country?: string;
  phone?: string;
  status?: number;
  totalPrice?: number;
  user?: any;
  dateOrdered?: string;
}
