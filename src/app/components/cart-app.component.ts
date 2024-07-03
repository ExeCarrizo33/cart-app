import { Component, OnInit, Output } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
import { CatalogComponent } from './catalog/catalog.component';
import { CartItem } from '../models/cartItem';
import { NavbarComponent } from './navbar/navbar.component';
import { ModalCartComponent } from './modal-cart/modal-cart.component';

@Component({
  selector: 'cart-app',
  standalone: true,
  imports: [CatalogComponent, ModalCartComponent, NavbarComponent],
  templateUrl: './cart-app.component.html',
})
export class CartAppComponent implements OnInit {
  products: Product[] = [];

  items: CartItem[] = [];

  total: number = 0;

  showCart: boolean = false;

  constructor(private service: ProductService) {}

  ngOnInit(): void {
    this.products = this.service.findAll();
    this.items = JSON.parse(sessionStorage.getItem('cart') || '[]');
    this.calculateTotal();
  }

  onDelete(id: number) {
    this.items = this.items.filter((item) => item.product.id != id);
    this.calculateTotal();
    this.saveSession();
  }

  calculateTotal() {
    this.total = this.items.reduce(
      (accumaltor, item) => accumaltor + item.quantity * item.product.price,
      0
    );
    this.saveSession();
  }

  OnAddCart(product: Product) {
    const hasItem = this.items.find((item) => {
      return item.product.id == product.id;
    });
    if (hasItem) {
      this.items = this.items.map((item) => {
        if (item.product.id == product.id) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }
        return item;
      });
    } else {
      this.items = [...this.items, { product: { ...product }, quantity: 1 }];
    }
    this.calculateTotal();
    this.saveSession();
  }

  saveSession() {
    sessionStorage.setItem('cart', JSON.stringify(this.items));
  }

  openCloseCart() {
    this.showCart = !this.showCart;
  }
}
