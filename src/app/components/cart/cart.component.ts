import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CartItem } from '../../models/cartItem';

@Component({
  selector: 'cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnChanges {
  @Input() items: CartItem[] = [];

  total: number = 0;

  @Output() idProduct = new EventEmitter();

  ngOnChanges(changes: SimpleChanges): void {
    this.calculateTotal();
    this.saveSession();

  }

  onDelete(id: number) {
    this.idProduct.emit(id);
  }

  saveSession() {
    sessionStorage.setItem('cart', JSON.stringify(this.items));
  }

  calculateTotal() {
    this.total = this.items.reduce(
      (accumaltor, item) => accumaltor + item.quantity * item.product.price,0);
  }
}
