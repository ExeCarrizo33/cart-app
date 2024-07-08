import { Component, OnInit, Output } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CatalogComponent } from './catalog/catalog.component';
import { CartItem } from '../models/cartItem';
import { NavbarComponent } from './navbar/navbar.component';
import { Router, RouterOutlet } from '@angular/router';
import { SharingDataService } from '../services/sharing-data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'cart-app',
  standalone: true,
  imports: [CatalogComponent, NavbarComponent, RouterOutlet],
  templateUrl: './cart-app.component.html',
})
export class CartAppComponent implements OnInit {
  items: CartItem[] = [];

  total: number = 0;

  constructor(
    private service: ProductService,
    private sharingDataService: SharingDataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.items = JSON.parse(sessionStorage.getItem('cart') || '[]');
    //this.calculateTotal();
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

          if (this.items.length) {
            sessionStorage.removeItem('cart');
            sessionStorage.clear;
          }
          // this.calculateTotal();
          this.saveSession();

          this.router
            .navigateByUrl('/', { skipLocationChange: true })
            .then(() => {
              this.router.navigate(['/cart'], {
                state: { items: this.items, total: this.total },
              });
            });

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

      //this.calculateTotal();
      this.saveSession();
      this.router.navigate(['/cart'], {
        state: { items: this.items, total: this.total },
      });

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
