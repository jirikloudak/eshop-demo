import { Injectable } from '@angular/core';
import { Order } from '../models/order.model';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orders: Order[] = [];

  constructor(private cartService: CartService) {}

  submitOrder(order: Order): Order {
    const newOrder = {
      ...order,
      id: this.orders.length + 1,
      items: [...this.cartService.getCart()], // Copy cart items
      total: this.cartService.getCartTotal(),
      date: new Date()
    };
    this.orders.push(newOrder);
    this.cartService.getCart().length = 0; // Clear the cart
    return newOrder;
  }

  getOrders(): Order[] {
    return this.orders;
  }
}