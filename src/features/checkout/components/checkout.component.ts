import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CartService } from '@core/services/cart.service';
import { ProductService } from '@core/services/product.service';
import { CartItem } from '@core/models/cart-item.model';
import { HeaderComponent } from '@core/components/header/header.component';
import { FooterComponent } from '@core/components/footer/footer.component';

interface SpecialOffer {
  type: string;
  description: string;
}

type DeliveryMethod = 'branch' | 'box' | 'home';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, HeaderComponent, FooterComponent],
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
  seniorDiscount = 0;
  specialOfferDiscount = 0;
  total = 0;
  orderDetails: any = {};
  appliedOffer: SpecialOffer | null = null;
  errorMessage: string | null = null;

  private readonly specialOfferCodes: Record<string, SpecialOffer> = {
    FREESHIP8: { type: 'freeDelivery', description: 'Free Delivery Applied!' },
    AUDIO20PC: { type: 'audioDiscount', description: '50% Audio Discount Applied!' },
    FLAT200OF: { type: 'flatDiscount', description: 'Flat $200 Discount Applied!' },
    FLAT99: { type: 'secretDiscount', description: 'Wow, how did you find this? 99% DISCOUNT!!!' }
  };
  private cartSubscription?: Subscription;

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
      city: [''],
      zipCode: ['', Validators.required],
      dateOfBirth: [''],
      email: ['', [Validators.required, Validators.email]],
      countryCode: ['CZ', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(this.getPhoneNumberPattern('CZ'))]],
      deliveryMethod: ['branch' as DeliveryMethod],
      paymentMethod: ['creditCard'],
      isStudent: [false],
      specialOfferCode: ['']
    });
  }

  ngOnInit(): void {
    this.subscribeToCart();
    this.setupFormSubscriptions();
  }

  ngOnDestroy(): void {
    this.cartSubscription?.unsubscribe();
  }

  private subscribeToCart(): void {
    this.cartSubscription = this.cartService.cart$.subscribe(cart => {
      this.cart = cart;
      this.calculateTotals();
      this.cdr.detectChanges();
    });
  }

  private setupFormSubscriptions(): void {
    this.checkoutForm.get('specialOfferCode')?.valueChanges.subscribe(() => {
      this.validateAndApplySpecialOffer();
    });

    this.checkoutForm.get('isStudent')?.valueChanges.subscribe(() => {
      this.validateAndApplySpecialOffer();
      this.calculateTotals();
      this.cdr.detectChanges();
    });

    this.checkoutForm.get('countryCode')?.valueChanges.subscribe(countryCode => {
      this.checkoutForm.get('phoneNumber')?.setValidators([
        Validators.required,
        Validators.pattern(this.getPhoneNumberPattern(countryCode))
      ]);
      this.checkoutForm.get('phoneNumber')?.updateValueAndValidity();
    });
  }

  toggleCart(): void {
    this.showCart = !this.showCart;
    this.cdr.detectChanges();
  }

  onDateOfBirthBlur(): void {
    this.validateAndApplySpecialOffer();
    this.calculateTotals();
    this.cdr.detectChanges();
  }

  private calculateAge(dateOfBirth: string): number {
    if (!dateOfBirth) return 0;
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  private isSenior(): boolean {
    return this.calculateAge(this.checkoutForm.get('dateOfBirth')?.value) >= 64;
  }

  private validateAndApplySpecialOffer(): void {
    const code = this.checkoutForm.get('specialOfferCode')?.value?.trim().toUpperCase();
    const isStudent = this.checkoutForm.get('isStudent')?.value;

    this.appliedOffer = null;
    this.specialOfferDiscount = 0;

    if (isStudent || this.isSenior()) {
      if (code && this.specialOfferCodes[code]) {
        this.checkoutForm.get('specialOfferCode')?.setValue('');
        alert('Special offer codes cannot be used with the student or senior discount.');
      }
      this.calculateTotals();
      return;
    }

    if (code && this.specialOfferCodes[code]) {
      this.appliedOffer = this.specialOfferCodes[code];
    } else if (code) {
      this.appliedOffer = { type: 'invalid', description: 'Invalid special offer code.' };
    }
    this.calculateTotals();
  }

  private calculateTotals(): void {
    this.cartSubtotal = this.cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
    this.calculateDeliveryFee();
    this.calculateDiscounts();
    this.adjustDiscounts();
    this.total = this.cartSubtotal + this.deliveryFee - this.creditCardDiscount - 
                 this.studentDiscount - this.seniorDiscount - this.specialOfferDiscount;
  }

  private calculateDeliveryFee(): void {
    const deliveryMethod = this.checkoutForm.get('deliveryMethod')?.value as DeliveryMethod;
    const deliveryFees: Record<DeliveryMethod, number> = {
      branch: 0,
      box: 79,
      home: 149
    };
    this.deliveryFee = deliveryFees[deliveryMethod] || 0;

    if (this.appliedOffer?.type === 'freeDelivery') {
      this.deliveryFee = 0;
    }
  }

  private calculateDiscounts(): void {
    const paymentMethod = this.checkoutForm.get('paymentMethod')?.value;
    const isStudent = this.checkoutForm.get('isStudent')?.value;

    this.creditCardDiscount = paymentMethod === 'creditCard' ? this.cartSubtotal * 0.05 : 0;
    this.studentDiscount = isStudent ? this.cartSubtotal * 0.15 : 0;
    this.seniorDiscount = this.isSenior() ? this.cartSubtotal * 0.10 : 0;
    this.specialOfferDiscount = this.calculateSpecialOfferDiscount();
  }

  private calculateSpecialOfferDiscount(): number {
    if (!this.appliedOffer || this.checkoutForm.get('isStudent')?.value) return 0;

    switch (this.appliedOffer.type) {
      case 'audioDiscount':
        const audioSubtotal = this.cart
          .filter(item => item.product.category?.toLowerCase() === 'audio')
          .reduce((total, item) => total + item.product.price * item.quantity, 0);
        return audioSubtotal * 0.20;
      case 'flatDiscount':
        return 200;
      case 'secretDiscount':
        return this.cartSubtotal * 0.99;
      default:
        return 0;
    }
  }

  private adjustDiscounts(): void {
    const totalDiscount = this.creditCardDiscount + this.studentDiscount + 
                         this.seniorDiscount + this.specialOfferDiscount;
    
    if (totalDiscount > this.cartSubtotal) {
      const scale = this.cartSubtotal / totalDiscount;
      this.creditCardDiscount *= scale;
      this.studentDiscount *= scale;
      this.seniorDiscount *= scale;
      this.specialOfferDiscount *= scale;
    }
  }

  updateDeliveryFee(): void {
    this.calculateTotals();
  }

  updateDiscounts(): void {
    this.calculateTotals();
  }

  confirmOrder(): void {
    if (!this.checkoutForm.valid) return;

    const invalidProducts = this.cart.filter(item => !item.product.default);
    if (invalidProducts.length > 0) {
      alert(`The following products cannot be bought: ${invalidProducts.map(item => item.product.name).join(', ')}`);
      this.cdr.detectChanges();
      return;
    }

    for (const item of this.cart) {
      const availableStock = this.productService.getStock(item.product.id);
      if (item.quantity > availableStock) {
        alert(`Cannot complete order: Only ${availableStock} units of ${item.product.name} are available, but you ordered ${item.quantity}.`);
        return;
      }
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

    this.cart.forEach(item => this.productService.reduceStock(item.product.id, item.quantity));
    this.cartService.clearCart();
    this.orderConfirmed = true;
    this.cartSubscription?.unsubscribe();
    this.cdr.detectChanges();
  }

  getDeliveryMethodLabel(method: string): string {
    const labels: Record<string, string> = {
      branch: 'Pick up at the branch',
      box: 'Delivery to box',
      home: 'Delivery to home'
    };
    return labels[method] || 'Unknown';
  }

  getPaymentMethodLabel(method: string): string {
    const labels: Record<string, string> = {
      creditCard: 'Credit Card',
      cash: 'Cash',
      paypal: 'PayPal'
    };
    return labels[method] || 'Unknown';
  }

  getPhoneNumberPattern(countryCode: string): string {
    const patterns: Record<string, string> = {
      CZ: '^[0-9]{9}$',
      SK: '^[0-9]{8}$',
      PL: '^[0-9]{9}$',
      AT: '^[0-9]{7,13}$',
      DE: '^[0-9]{10,11}$'
    };
    return patterns[countryCode] || '^[0-9]{7,15}$';
  }

  getCountryCodeDisplay(countryCode?: string): string {
    const code = countryCode || this.checkoutForm.get('countryCode')?.value;
    const prefixes: Record<string, string> = {
      CZ: '+420',
      SK: '+421',
      PL: '+48',
      AT: '+43',
      DE: '+49'
    };
    return prefixes[code] || '+420';
  }

  updateCountryCode(): void {
    this.cdr.detectChanges();
  }

  getFlagUrl(countryCode: string): string {
    return `https://flagcdn.com/${countryCode.toLowerCase()}.svg`;
  }

  get cartTotal(): number {
    return this.cartService.getCartTotal();
  }
}