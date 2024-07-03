import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItem } from '../../models/cartItem';
import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'modal-cart',
  standalone: true,
  imports: [CartComponent],
  templateUrl: './modal-cart.component.html',
})
export class ModalCartComponent {
  @Input() items: CartItem[] = [];
  @Input() total: number = 0;

  @Output() idProduct = new EventEmitter();

  @Output() closeEvent = new EventEmitter();

  onDelete(id: number) {
    this.idProduct.emit(id);
  }

  closeCart() {
    this.closeEvent.emit();
  }
}
