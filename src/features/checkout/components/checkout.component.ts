import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '@core/services/cart.service';
import { OrderService } from '@core/services/order.service';
import { Order } from '@core/models/order.model';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  checkoutForm: Order = {
    customerName: '',
    address: '',
    paymentMethod: 'Credit Card',
    items: [],
    total: 0,
    date: new Date()
  };

  submittedOrder: Order | null = null;
  

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router
  ) {}

  get cartItems() {
    return this.cartService.getCart();
  }

  get cartTotal() {
    return this.cartService.getCartTotal();
  }

  onSubmit() {
    if (this.cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    this.checkoutForm.items = this.cartItems;
    this.checkoutForm.total = this.cartTotal;
    this.checkoutForm.date = new Date();

    this.submittedOrder = this.orderService.submitOrder(this.checkoutForm);
    // Optionally redirect or show confirmation

    this.cartService.clearCart();
  }

  goBackToShop() {
    this.router.navigate(['/']);
  }
}