import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '@core/services/product.service';
import { CartService } from '@core/services/cart.service';
import { Product } from '@core/models/product.model';
import { CartItem } from '@core/models/cart-item.model';
import { HeaderComponent } from '@core/components/header/header.component';
import { FooterComponent } from '@core/components/footer/footer.component';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, HeaderComponent, FooterComponent],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Product | undefined;
  showCart = false;
  cart: CartItem[] = [];
  quantity: number = 1;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {
    this.cartService.cart$.subscribe(cart => {
      this.cart = cart;
    });
  }

  ngOnInit(): void {
    const productId = Number(this.route.snapshot.paramMap.get('id'));
    this.product = this.productService.getProducts().find(p => p.id === productId);
  }

  get cartTotal(): number {
    return this.cartService.getCartTotal();
  }

  toggleCart(): void {
    console.log('toggleCart called in ProductDetailComponent, showCart before:', this.showCart); // Debugging
    this.showCart = !this.showCart;
    console.log('showCart after:', this.showCart); // Debugging
  }

addToCart(): void {
  if (this.product) {
    const cartQuantity = this.getCartQuantity(this.product.id);
    if (this.product.stock > 0 && this.quantity <= this.product.stock - cartQuantity) {
      this.cartService.addToCart(this.product, this.quantity);
      this.quantity = 1;
    } else {
      alert('Not enough stock available!');
    }
  }
}

  increaseQuantity(item: CartItem): void {
    if (item.product.stock >= item.quantity + 1) {
      this.cartService.increaseQuantity(item);
    } else {
      alert('Not enough stock available!');
    }
  }

incrementQuantity(): void {
  if (this.product) {
    const cartQuantity = this.getCartQuantity(this.product.id);
    if (this.quantity < this.product.stock - cartQuantity) {
      this.quantity++;
    }
  }
}
  decrementQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  decreaseQuantity(item: CartItem): void {
    this.cartService.decreaseQuantity(item);
  }

  isInCart(): boolean {
    return this.product ? this.cartService.isInCart(this.product) : false;
  }

  getCartQuantity(productId: number | undefined): number {
    if (!productId) return 0;
    const cartItem = this.cart.find(item => item.product.id === productId);
    return cartItem ? cartItem.quantity : 0;
  }

  clearCart(): void {
    this.cartService.clearCart();
  }
}