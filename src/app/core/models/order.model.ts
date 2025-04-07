import { CartItem } from './cart-item.model';

export interface Order {
  id?: number;              // Optional, assigned after submission
  customerName: string;
  address: string;
  paymentMethod: string;
  items: CartItem[];
  total: number;
  date: Date;
}