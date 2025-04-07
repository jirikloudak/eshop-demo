import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { CartItem } from '../models/cart-item.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>(this.cart);
  cart$ = this.cartSubject.asObservable();

  constructor() {
    // Load cart from localStorage on initialization
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cart = JSON.parse(savedCart);
      this.cartSubject.next(this.cart);
    }
  }

  private saveCart(): void {
    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.cartSubject.next(this.cart);
  }

  getCart(): CartItem[] {
    return this.cart;
  }

  getTotalItems(): number {
    return this.cart.reduce((total, item) => total + item.quantity, 0);
  }

  getCartTotal(): number {
    return this.cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }

  addToCart(product: Product, quantity: number = 1): void {
    const existingItem = this.cart.find(item => item.product.id === product.id);
    if (!existingItem) {
      this.cart.push({ product, quantity });
      this.saveCart();
    } else {
      existingItem.quantity += quantity;
      this.saveCart();
    }
  }

  removeFromCart(item: CartItem): void {
    const index = this.cart.indexOf(item);
    if (index !== -1) {
      this.cart.splice(index, 1);
    }
    this.saveCart();
  }

  increaseQuantity(item: CartItem): void {
    item.quantity++;
    this.saveCart();
  }

  decreaseQuantity(item: CartItem): void {
    if (item.quantity > 1) {
      item.quantity--;
    } else {
      this.removeFromCart(item);
    }
    this.saveCart();
  }

  isInCart(product: Product): boolean {
    return this.cart.some(item => item.product.id === product.id);
  }

  clearCart(): void {
    this.cart = [];
    this.saveCart(); // Save after clearing
  }
}