import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItem } from '../../models/cartItem';

@Component({
  selector: 'cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
})
export class CartComponent {

  @Input() items: CartItem[] = [];

  @Input() total:number = 0;

  @Output() idProduct = new EventEmitter();

  onDelete(id: number){
      this.idProduct.emit(id)
  }

}
