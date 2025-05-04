import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ProductService } from '@core/services/product.service';
import { Product } from '@core/models/product.model';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  products: Product[] = [];
  showModal = false;
  isEditing = false;
  showCategoryDropdown = false;
  newProduct: Product = { 
    id: 0, 
    name: '', 
    category: '', 
    price: 0, 
    stock: 0, 
    imageUrl: '',
    color: '',
    description: '',
    brand: '',
    default: false
  };
  categories: string[] = [
    'Audio',
    'Accessories',
    'Monitors',
    'Storage',
    'Wearables',
    'Toys',
    'Home',
    'Electronics',
    'Cameras'
  ];
  private tempStockInput: string = '';

  constructor(private productService: ProductService) {
    this.products = this.productService.getProducts();
  }

  openAddProductModal() {
    this.isEditing = false;
    this.newProduct = { 
      id: 0, 
      name: '', 
      category: '', 
      price: 0, 
      stock: 0, 
      imageUrl: '',
      color: '',
      description: '',
      brand: '',
      default: false
    };
    this.showModal = true;
    this.showCategoryDropdown = false;
  }

  closeModal() {
    this.showModal = false;
  }

  saveProduct() {
    if (this.newProduct.name && this.newProduct.category && this.newProduct.price > 0 && this.newProduct.imageUrl) {
      if (this.isEditing) {
        // Update existing product
        this.productService.updateProduct(this.newProduct);
      } else {
        // Add new product
        this.productService.addProduct(this.newProduct);
      }
      this.products = this.productService.getProducts();
      this.categories = [...new Set(this.products.map(product => product.category))];
      this.closeModal();
    } else {
      alert('Please fill in all required fields correctly.');
    }
  }

  editProduct(product: Product) {
    if (product.default){
      this.isEditing = true;
      this.newProduct = { ...product };
      this.showModal = true;
      this.showCategoryDropdown = false;
    }

  }

  removeProduct(id: number) {
    if (confirm('Are you sure you want to remove this product?')) {
      this.productService.removeProduct(id);
      this.products = this.productService.getProducts(); // Refresh list
    }
  }

  onStockInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const rawValue = input.value.trim();
    this.tempStockInput = rawValue; // Store raw input

    // If the input is empty or just '-', don't update newProduct.stock yet
    if (rawValue === '' || rawValue === '-') {
      return;
    }

    // Try to parse the input as a number
    const value = Number(rawValue);
    if (!isNaN(value) && isFinite(value)) {
      this.newProduct.stock = value; // Update stock only for valid numbers
    }
  }

  onStockBlur(): void {
    // Handle incomplete inputs (e.g., '-') when the input loses focus
    if (this.tempStockInput === '' || this.tempStockInput === '-' || isNaN(Number(this.tempStockInput))) {
      this.newProduct.stock = 0; // Reset to 0 if invalid or empty
    } else {
      this.newProduct.stock = Number(this.tempStockInput); // Ensure valid number
    }
    this.tempStockInput = this.newProduct.stock.toString(); // Sync temp value
  }

  exportToExcel() {
    const worksheetData = this.products
      .filter(product => product.default === true)
      .map(product => ({
        ID: product.id,
        Name: product.name,
        Category: product.category,
        Price: product.price.toFixed(2),
        Color: product.stock,
        'Image URL': product.imageUrl,
        Stock: product.color || '',
        Description: product.description || '',
        Brand: product.brand || ''
      }));

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Products');
    XLSX.writeFile(workbook, 'products.xlsx');
  }
}