import { Injectable, signal } from '@angular/core';
import { Cart } from '../../Entities/Models/Cart/cart';
import { UUID } from 'crypto';
import { Product } from '../../Entities/Products/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private localStorageKey = 'cart'; // Clave para almacenar en localStorage
  private productCarList = signal<Cart[]>(this.loadCartFromLocalStorage());

  constructor() {}

  private saveCartToLocalStorage() {
    if (typeof window !== 'undefined' && localStorage) {
      localStorage.setItem(
        this.localStorageKey,
        JSON.stringify(this.productCarList())
      );
    }
  }

  loadCartFromLocalStorage(): Cart[] {
    if (typeof window !== 'undefined' && localStorage) {
      const storedCart = localStorage.getItem(this.localStorageKey);
      return storedCart ? JSON.parse(storedCart) : [];
    }

    return []; // Si no hay localStorage (SSR o pruebas), retorna un array vacío
  }

  public addProduct(product: Product) {
    //Verifica si ya existe el producto
    if (
      this.productCarList().some(
        (myProduct) => myProduct.product.id === product.id
      )
    )
      return;

    let cart: Cart = { product: product, quantity: 1, total: product.price };

    //Agrega el producto
    this.productCarList.update((products) => {
      const updatedCart = [...new Set([...products, cart])];
      return updatedCart;
    });

    this.saveCartToLocalStorage(); // Guarda en localStorage
  }

  get getProducts(): Cart[] {
    return this.productCarList();
  }

  increaseQuantity(productId: UUID) {
    this.productCarList.update((cart) => {
      cart
        .filter((product) => product.product.id === productId)
        .forEach((product) => {
          product.quantity++;
          product.total = product.quantity * product.product.price;
        });

      this.saveCartToLocalStorage(); // Guarda cambios
      return [...cart];
    });
  }

  decreaseQuantity(productId: UUID) {
    this.productCarList.update((cart) => {
      cart
        .filter((product) => product.product.id === productId)
        .forEach((product) => {
          product.quantity--;
          product.total = product.quantity * product.product.price; //Actualiza el total
        });

      this.saveCartToLocalStorage(); // Guarda cambios
      return [...cart];
    });
  }

  deleteProduct(productId: UUID) {
    this.productCarList.update((cart) => {
      const updatedCart = cart.filter(
        (product) => product.product.id !== productId
      );
      return updatedCart;
    });

    this.saveCartToLocalStorage(); // Guarda cambios
  }

  clearCart() {
    localStorage.removeItem(this.localStorageKey);
    this.productCarList.set([]); // Limpia la señal
  }

  get totalProducts(): number {
    return this.productCarList().length;
  }

  get totalToPay(): number {
    let total: number = 0;

    this.productCarList().forEach((product) => (total += product.total));

    return total;
  }
}
