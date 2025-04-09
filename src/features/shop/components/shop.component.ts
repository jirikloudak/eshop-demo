import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '@core/services/cart.service';
import { Product } from '@core/models/product.model';
import { CartItem } from '@core/models/cart-item.model';
import { RouterLink } from '@angular/router';
import { ProductService } from '@core/services/product.service';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { HeaderComponent } from '@core/components/header/header.component';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, HeaderComponent  ],
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  showCart = false;
  categories: string[] = [];
  categoryControl = new FormControl('All');
  sortControl = new FormControl('default'); 

  constructor(
    private cartService: CartService,
    private productService: ProductService
  ) {
    this.loadProducts();
    this.categoryControl.valueChanges.subscribe(() => this.applyFiltersAndSort());
    this.sortControl.valueChanges.subscribe(() => this.applyFiltersAndSort());
  }

  loadProducts(): void {
    this.products = this.productService.getProducts();
    this.categories = ['All', ...new Set(this.products.map(product => product.category))];
    this.applyFiltersAndSort();
  }

  get cart(): CartItem[] {
    return this.cartService.getCart();
  }

  get totalItems(): number {
    return this.cartService.getTotalItems();
  }

  get cartTotal(): number {
    return this.cartService.getCartTotal();
  }

  toggleCart(): void {
    this.showCart = !this.showCart;
  }

  addToCart(product: Product): void {
    if (product.stock > 0) {
      this.cartService.addToCart(product);
    } else {
      alert('This product is out of stock!');
    }
  }

  increaseQuantity(item: any): void {
    if (item.product.stock >= item.quantity + 1) {
      this.cartService.increaseQuantity(item);
    } else {
      alert('Not enough stock available!');
    }
  }

  decreaseQuantity(item: CartItem): void {
    this.cartService.decreaseQuantity(item);
  }

  isInCart(product: Product): boolean {
    return this.cartService.isInCart(product);
  }

  selectCategory(category: string): void {
    this.categoryControl.setValue(category);
  }

  applyFiltersAndSort(): void {
    let filtered = this.products;
    const selectedCategory = this.categoryControl.value;
    const sortOption = this.sortControl.value;

    if (selectedCategory !== 'All') {
      filtered = this.products.filter(product => product.category === selectedCategory);
    }

    this.filteredProducts = [...filtered].sort((a, b) => {
      switch (sortOption) {
        case 'default':
          return a.id - b.id;
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'stock-asc':
          return a.stock - b.stock;
        case 'stock-desc':
          return b.stock - a.stock;
        default:
          return 0;
      }
    });
  }

  clearCart(): void{
    this.cartService.clearCart();
  }
}