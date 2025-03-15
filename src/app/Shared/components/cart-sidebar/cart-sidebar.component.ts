import { Component, inject, OnInit, signal } from '@angular/core';
import { CartService } from '../../../core/Services/Cart/cart.service';
import { Cart } from '../../../core/Entities/Models/Cart/cart';
import { UUID } from 'crypto';
import { InventoryService } from '../../../core/Services/Inventory/inventory.service';
import { RecordTransaction } from '../../../core/Entities/Models/RecordTransaction/record-transaction';
import { Inventory } from '../../../core/Entities/Inventory/inventory';
import { AlertComponent } from '../alert/alert.component';

@Component({
  selector: 'app-cart-sidebar',
  imports: [AlertComponent],
  templateUrl: './cart-sidebar.component.html',
  styleUrl: './cart-sidebar.component.css',
})
export class CartSidebarComponent {
  private productCarList = inject(CartService);
  private inventoryService = inject(InventoryService);

  private paymentMethod = signal('');
  notificationMessage = signal('');
  alertType = signal('');

  private timeoutId: NodeJS.Timeout | null = null;

  private showMessage(message: string, alert: string,duration: number) {
    /*Este método controlo cuanto tiempo debe mostrase la notificación*/
    this.configMessageAlert(message, alert);

    this.timeoutId = setTimeout(() => {
      //Reseate el mensaje para que desaparezca de la UI al finalizar el tiempo
      this.notificationMessage.set('');
    }, duration);
  }

  private configMessageAlert(message: string, messageType: string): void {
    //Mensage y estilo a mostrar en el alert
    this.notificationMessage.set(message);
    this.alertType.set(messageType);
  }

  setPaymentMethod(paymentMethod: string): void {
    this.paymentMethod.set(paymentMethod);
  }

  getPaymentMethod(): string {
    return this.paymentMethod();
  }

  get getProducts(): Cart[] {
    return this.productCarList.getProducts;
  }

  increaseQuantity(productId: UUID) {
    this.productCarList.increaseQuantity(productId);
  }

  decreaseQuantity(productId: UUID) {
    this.productCarList.decreaseQuantity(productId);
  }

  deleteProduct(productId: UUID) {
    this.productCarList.deleteProduct(productId);
  }

  totalProducts(): number {
    return this.productCarList.totalProducts;
  }

  totalToPay(): number {
    return this.productCarList.totalToPay;
  }

  makePurchase() {
    if(!this.paymentMethod()){
      this.showMessage('Debes seleccionar el método de pago.', 'alert-warning', 3000);
      return;
    }

    let productList: RecordTransaction[] = [];

    this.productCarList.getProducts.forEach((product) => {
      const prod: RecordTransaction = {
        productId: product.product.id,
        userId: '1972ce7d-935e-42da-8f92-03bbc402a131',//ERROR, RECUPERAR EL ID
        quantity: product.quantity,
      };

      productList.push(prod);
    });

    this.inventoryService
      .productOutput(productList, this.paymentMethod())
      .subscribe({
        next: (response: Inventory[]) => {
          this.productCarList.clearCart();
          this.showMessage('Compra realizada.', 'alert-success', 5000);
        },
        error: (response: any) => {
          console.log('Error ' + response);
          this.showMessage(
            'No se pudo realizar la compra.',
            'alert-danger',
            5000
          );
        },
      });
  }
}
