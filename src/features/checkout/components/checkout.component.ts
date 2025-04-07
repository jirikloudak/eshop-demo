import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartService } from '@core/services/cart.service';
import { CartItem } from '@core/models/cart-item.model';
import { HeaderComponent } from '@core/components/header/header.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, HeaderComponent],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit, OnDestroy {
  cart: CartItem[] = [];
  checkoutForm: FormGroup;
  orderConfirmed = false;
  showCart = false;
  cartSubtotal = 0;
  deliveryFee = 0;
  creditCardDiscount = 0;
  studentDiscount = 0;
  total = 0;
  orderDetails: any = {};
  private cartSubscription!: Subscription;

  constructor(
    private cartService: CartService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    this.checkoutForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      zipCode: ['', Validators.required],
      deliveryMethod: ['branch'],
      paymentMethod: ['creditCard'],
      isStudent: [false]
    });
  }

  ngOnInit(): void {
    this.cartSubscription = this.cartService.cart$.subscribe(cart => {
      this.cart = cart;
      console.log('Cart updated in CheckoutComponent:', this.cart);
      this.calculateTotals();
    });
    this.calculateTotals();
  }

  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  toggleCart(): void {
    this.showCart = !this.showCart;
    this.cdr.detectChanges();
  }

  calculateTotals(): void {
    // Calculate subtotal
    this.cartSubtotal = this.cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    console.log('Cart Subtotal:', this.cartSubtotal);

    // Calculate delivery fee
    const deliveryMethod = this.checkoutForm.get('deliveryMethod')?.value;
    console.log('Delivery Method:', deliveryMethod);
    switch (deliveryMethod) {
      case 'branch':
        this.deliveryFee = 0;
        break;
      case 'box':
        this.deliveryFee = 79;
        break;
      case 'home':
        this.deliveryFee = 149;
        break;
      default:
        this.deliveryFee = 0;
    }
    console.log('Delivery Fee:', this.deliveryFee);

    // Calculate discounts
    const paymentMethod = this.checkoutForm.get('paymentMethod')?.value;
    const isStudent = this.checkoutForm.get('isStudent')?.value;
    console.log('Payment Method:', paymentMethod, 'Is Student:', isStudent);

    this.creditCardDiscount = 0;
    this.studentDiscount = 0;

    if (paymentMethod === 'creditCard') {
      this.creditCardDiscount = this.cartSubtotal * 0.05;
    }

    if (isStudent) {
      this.studentDiscount = this.cartSubtotal * 0.15;
    }

    // Ensure discounts don't exceed subtotal
    const totalDiscount = this.creditCardDiscount + this.studentDiscount;
    if (totalDiscount > this.cartSubtotal) {
      this.creditCardDiscount = (this.creditCardDiscount / totalDiscount) * this.cartSubtotal;
      this.studentDiscount = (this.studentDiscount / totalDiscount) * this.cartSubtotal;
    }
    console.log('Discounts:', {
      creditCardDiscount: this.creditCardDiscount,
      studentDiscount: this.studentDiscount
    });

    // Calculate total
    this.total = this.cartSubtotal + this.deliveryFee - this.creditCardDiscount - this.studentDiscount;
    console.log('Total Calculation:', {
      cartSubtotal: this.cartSubtotal,
      deliveryFee: this.deliveryFee,
      creditCardDiscount: this.creditCardDiscount,
      studentDiscount: this.studentDiscount,
      total: this.total
    });
  }

  updateDeliveryFee(): void {
    this.calculateTotals();
  }

  updateDiscounts(): void {
    this.calculateTotals();
  }

  confirmOrder(): void {
    if (this.checkoutForm.valid) {
      this.orderDetails = {
        ...this.checkoutForm.value,
        cart: this.cart,
        cartSubtotal: this.cartSubtotal,
        deliveryFee: this.deliveryFee,
        creditCardDiscount: this.creditCardDiscount,
        studentDiscount: this.studentDiscount,
        total: this.total
      };
      this.cartService.clearCart();
      this.orderConfirmed = true;
      if (this.cartSubscription) {
        this.cartSubscription.unsubscribe();
      }
      this.cdr.detectChanges();
    }
  }

  getDeliveryMethodLabel(method: string): string {
    switch (method) {
      case 'branch':
        return 'Pick up at the branch';
      case 'box':
        return 'Delivery to box';
      case 'home':
        return 'Delivery to home';
      default:
        return 'Unknown';
    }
  }

  getPaymentMethodLabel(method: string): string {
    switch (method) {
      case 'creditCard':
        return 'Credit Card';
      case 'cash':
        return 'Cash';
      case 'paypal':
        return 'PayPal';
      default:
        return 'Unknown';
    }
  }

  get cartTotal(): number {
    return this.cartService.getCartTotal();
  }
}