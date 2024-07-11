import { Component, OnInit, Output } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CatalogComponent } from './catalog/catalog.component';
import { CartItem } from '../models/cartItem';
import { NavbarComponent } from './navbar/navbar.component';
import { Router, RouterOutlet } from '@angular/router';
import { SharingDataService } from '../services/sharing-data.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { ItemsState } from '../store/items.reducer';
import { add, remove, total } from '../store/items.action';
import { state } from '@angular/animations';

@Component({
  selector: 'cart-app',
  standalone: true,
  imports: [CatalogComponent, NavbarComponent, RouterOutlet],
  templateUrl: './cart-app.component.html',
})
export class CartAppComponent implements OnInit {
  items: CartItem[] = [];

  constructor(
    private store: Store<{ items: ItemsState }>,
    private sharingDataService: SharingDataService,
    private router: Router
  ) {
    this.store.select('items').subscribe((state) => {
      this.items = state.items;
      this.saveSession();
    });
  }

  ngOnInit(): void {
    this.store.dispatch(total());
    this.onDelete();
    this.OnAddCart();
  }

  onDelete() {
    this.sharingDataService.idProductEventEmitter.subscribe((id) => {
      Swal.fire({
        title: 'Estas seguro?',
        text: 'Cuidado el item se eliminara del carro de compras!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar!',
      }).then((result) => {
        if (result.isConfirmed) {
          this.store.dispatch(remove({ id }));
          this.store.dispatch(total());
          this.router.navigate(['/cart']);

          Swal.fire({
            title: 'Eliminado!',
            text: 'Se ha eliminado el item!',
            icon: 'success',
          });
        }
      });
    });
  }

  OnAddCart() {
    this.sharingDataService.productEventEmitter.subscribe((product) => {
      this.store.dispatch(add({ product }));
      this.store.dispatch(total());
      this.router.navigate(['/cart']);

      Swal.fire({
        title: 'Shopping Cart',
        text: 'Nuevo producto agregado al carro!',
        icon: 'success',
      });
    });
  }

  saveSession() {
    sessionStorage.setItem('cart', JSON.stringify(this.items));
  }
}
