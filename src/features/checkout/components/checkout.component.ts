import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartService } from '@core/services/cart.service';
import { ProductService } from '@core/services/product.service';
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
  specialOfferDiscount = 0;
  total = 0;
  orderDetails: any = {};
  private cartSubscription!: Subscription;

  private specialOfferCodes: { [key: string]: { type: string, description: string } } = {
    'FREESHIP8': { type: 'freeDelivery', description: 'Free Delivery Applied!' },
    'AUDIO20PC': { type: 'audioDiscount', description: '50% Audio Discount Applied!' },
    'FLAT200OF': { type: 'flatDiscount', description: 'Flat $200 Discount Applied!' },
    'FLAT99'   : { type: 'secretDiscount', description: 'Wow, how did you find this? 99% DISCOUNT!!!'}
  };
  appliedOffer: { type: string, description: string } | null = null;

  constructor(
    private cartService: CartService,
    private productService: ProductService,
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
      isStudent: [false],
      specialOfferCode: ['']
    });
  }

  ngOnInit(): void {
    this.cartSubscription = this.cartService.cart$.subscribe(cart => {
      this.cart = cart;
      this.calculateTotals();
    });
    this.calculateTotals();

    this.checkoutForm.get('specialOfferCode')?.valueChanges.subscribe(() => {
      this.validateAndApplySpecialOffer();
    });
    this.checkoutForm.get('isStudent')?.valueChanges.subscribe(() => {
      this.validateAndApplySpecialOffer();
      this.calculateTotals();
    });
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

  validateAndApplySpecialOffer(): void {
    const code = this.checkoutForm.get('specialOfferCode')?.value?.trim().toUpperCase();
    const isStudent = this.checkoutForm.get('isStudent')?.value;

    // Reset the applied offer
    this.appliedOffer = null;
    this.specialOfferDiscount = 0;

    // If student discount is active, special offers cannot be applied
    if (isStudent) {
      if (code && this.specialOfferCodes[code]) {
        this.checkoutForm.get('specialOfferCode')?.setValue(''); // Clear the code
        alert('Special offer codes cannot be used with the student discount.');
      }
      this.calculateTotals();
      return;
    }

    // Validate the code
    if (code && this.specialOfferCodes[code]) {
      this.appliedOffer = this.specialOfferCodes[code];
    } else if (code) {
      this.appliedOffer = { type: 'invalid', description: 'Invalid special offer code.' };
    }
    this.calculateTotals();
  }

  calculateTotals(): void {
    // Calculate subtotal
    this.cartSubtotal = this.cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);

    // Calculate delivery fee
    const deliveryMethod = this.checkoutForm.get('deliveryMethod')?.value;
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
    if (this.appliedOffer?.type === 'freeDelivery') {
      this.deliveryFee = 0;
    }

    // Calculate discounts
    const paymentMethod = this.checkoutForm.get('paymentMethod')?.value;
    const isStudent = this.checkoutForm.get('isStudent')?.value;

    this.creditCardDiscount = 0;
    this.studentDiscount = 0;
    this.specialOfferDiscount = 0;

    if (paymentMethod === 'creditCard') {
      this.creditCardDiscount = this.cartSubtotal * 0.05;
    }

    if (isStudent) {
      this.studentDiscount = this.cartSubtotal * 0.15;
    }

    if (!isStudent && this.appliedOffer) {
      if (this.appliedOffer.type === 'audioDiscount') {
        const audioItems = this.cart.filter(item => 
          item.product.category && 
          item.product.category.toLowerCase() === 'audio' // Exact match for "audio"
        );
        const audioSubtotal = audioItems.reduce((total, item) => 
          total + (item.product.price * item.quantity), 0
        );
        this.specialOfferDiscount = audioSubtotal * 0.20; // 20% discount on audio products
      } else if (this.appliedOffer.type === 'flatDiscount') {
        this.specialOfferDiscount = 200; // Flat $200 discount
      } else if (this.appliedOffer.type === 'secretDiscount') {
        this.specialOfferDiscount = this.cartSubtotal * 0.99;
      }
    }

    // Ensure discounts don't exceed subtotal
    const totalDiscount = this.creditCardDiscount + this.studentDiscount + this.specialOfferDiscount;
    if (totalDiscount > this.cartSubtotal) {
      this.creditCardDiscount = (this.creditCardDiscount / totalDiscount) * this.cartSubtotal;
      this.studentDiscount = (this.studentDiscount / totalDiscount) * this.cartSubtotal;
      this.specialOfferDiscount = (this.specialOfferDiscount / totalDiscount) * this.cartSubtotal;
    }

    // Calculate total
    this.total = this.cartSubtotal + this.deliveryFee - this.creditCardDiscount - this.studentDiscount - this.specialOfferDiscount;
  }

  updateDeliveryFee(): void {
    this.calculateTotals();
  }

  updateDiscounts(): void {
    this.calculateTotals();
  }

  confirmOrder(): void {
    if (this.checkoutForm.valid) {
      for (const item of this.cart) {
        const availableStock = this.productService.getStock(item.product.id);
        //if (item.quantity > availableStock) {
        //  alert(`Cannot complete order: Only ${availableStock} units of ${item.product.name} are available, but you ordered ${item.quantity}.`);
        //  return;
        //}
      }

      this.orderDetails = {
        ...this.checkoutForm.value,
        cart: this.cart,
        cartSubtotal: this.cartSubtotal,
        deliveryFee: this.deliveryFee,
        creditCardDiscount: this.creditCardDiscount,
        studentDiscount: this.studentDiscount,
        total: this.total
      };
      this.cart.forEach(item => {
        this.productService.reduceStock(item.product.id, item.quantity);
      });
      
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