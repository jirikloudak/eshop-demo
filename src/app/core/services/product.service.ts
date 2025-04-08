import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { defaultProducts } from '../data/default-products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [];

  constructor() {
    // Load products from localStorage on initialization
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
      this.products = JSON.parse(savedProducts);
    } else {
      // If no products in localStorage, initialize with default list
      this.products = defaultProducts;
      this.saveProducts(); // Save initial products to localStorage
    }
  }

  private saveProducts(): void {
    // Save products to localStorage
    localStorage.setItem('products', JSON.stringify(this.products));
  }

  getProducts(): Product[] {
    return this.products;
  }

  addProduct(product: Product): void {
    const newId = this.products.length > 0 ? Math.max(...this.products.map(p => p.id)) + 1 : 1;
    this.products.push({ ...product, id: newId });
    this.saveProducts();
  }

  removeProduct(id: number): void {
    this.products = this.products.filter(product => product.id !== id);
    this.saveProducts();
  }

  updateProduct(updatedProduct: Product): void {
    this.products = this.products.map(product =>
      product.id === updatedProduct.id ? updatedProduct : product
    );
    this.saveProducts();
  }

  reduceStock(productId: number, quantity: number): void {
    const product = this.products.find(p => p.id === productId);
    if (product) {
      product.stock = Math.max(0, product.stock - quantity); // Ensure stock doesn't go below 0
      console.log(`Reduced stock for product ${productId}: ${product.stock} remaining`);
    }
  }

  getStock(productId: number): number {
    const product = this.products.find(p => p.id === productId);
    return product ? product.stock : 0;
  }
}