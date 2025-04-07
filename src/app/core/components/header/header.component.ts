import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '@core/services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() toggleCartEvent = new EventEmitter<void>();

  totalItems: number = 0;

  constructor(private cartService: CartService) {
    this.cartService.cart$.subscribe(cart => {
      this.totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
      console.log('Cart updated in HeaderComponent:', cart, 'Total Items:', this.totalItems);
    });
  }

  toggleCart(): void {
    this.toggleCartEvent.emit();
  }
}