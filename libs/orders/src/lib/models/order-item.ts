// eslint-disable-next-line @nx/enforce-module-boundaries
import { Product } from '@frontend/products';

export class OrderItem {
  product?: Product;
  quantity?: number;
}
