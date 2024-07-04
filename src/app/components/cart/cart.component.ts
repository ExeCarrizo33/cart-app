import {
  Component,
  EventEmitter,
} from '@angular/core';
import { CartItem } from '../../models/cartItem';
import { Router } from '@angular/router';
import { SharingDataService } from '../../services/sharing-data.service';

@Component({
  selector: 'cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
})
export class CartComponent {
  items: CartItem[] = [];

  total: number = 0;



  constructor(private router: Router,
              private sharingDataService: SharingDataService){
    this.items = router.getCurrentNavigation()?.extras.state!['items'];
    this.total = router.getCurrentNavigation()?.extras.state!['total'];
  }

  onDelete(id: number) {
    this.sharingDataService.idProductEventEmitter.emit(id);
  }
}
