import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ProductsService } from '../../../core/Services/Products/products.service';
import { Product } from '../../../core/Entities/Products/product';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ConfirmationModalComponent } from '../../../Shared/components/confirmation-modal/confirmation-modal.component';
import { AlertComponent } from '../../../Shared/components/alert/alert.component';

@Component({
  selector: 'app-list-products',
  imports: [RouterModule, ConfirmationModalComponent, AlertComponent],
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.css',
})
export default class ListProductsComponent implements OnInit {
  private productService = inject(ProductsService);

  private readonly numbersRecords: number = 8;

  errorMessage = signal('');
  alertType = signal('');
  private deleteProductId = signal('');

  products: Product[] = [];

  disabledNextButton = signal(true);
  disabledPreviousButton = signal(true);
  currentPage = signal(0);
  totalProducts = signal(0);
  notificationMessage = signal('');
  pageNumbers = computed(() =>
    Math.ceil(this.totalProducts() / this.numbersRecords)
  );

  private timeoutId: NodeJS.Timeout | null = null;

  constructor(private route: ActivatedRoute) {}

  private showMessage(message: string, alert: string, duration: number) {
    /*Este método controlo cuanto tiempo debe mostrase la notificación*/
    this.configMessageAlert(message, alert);

    this.timeoutId = setTimeout(() => {
      //Reseate el mensaje para que desaparezca de la UI al finalizar el tiempo
      this.notificationMessage.set('');
    }, duration);
  }

  ngOnInit(): void {
    if (typeof document !== 'undefined') {
      this.getTotalProducts();

      //Recupera de la url el número de la paginación
      this.route.params.subscribe((params) =>
        this.currentPage.set(params['page'])
      );

      this.findProducts();
    }
  }

  private getTotalProducts() {
    this.productService.getTotalProducts().subscribe({
      next: (response: number) => {
        this.totalProducts.set(response);
      },
      error: (response: any) => {
        this.showMessage(
          'No se puedo recuperar el total de los productos',
          'alert-danger',
          5000
        );
        console.log('Error: ' + response);
      },
    });
  }

  private findProducts() {
    this.productService
      .findProducts(this.currentPage(), this.numbersRecords)
      .subscribe({
        next: (response: Product[]) => {
          this.products = response;

          this.disabledNextBtn();
          this.disabledPreviousBtn();
        },
        error: (response: any) => {
          this.products = [];
          this.showMessage(
            `No se puedo recuperar los productos de la página`,
            'alert-danger',
            5000
          );

          console.log('Error: ' + response);
        },
      });
  }

  public deleteProduct(productId: string) {
    this.productService.deleteProduct(productId).subscribe({
      next: (response: any) => {
        this.showMessage(
          'Producto eliminado correctamente.',
          'alert-success',
          5000
        );

        this.findProducts();
        this.getTotalProducts();        
      },
      error: (response: any) => {
        this.showMessage(
          'No se puedo eliminar el producto.',
          'alert-danger',
          5000
        );
        console.log('Error: ' + response);
      },
    });
  }

  goToPage(page: number) {
    this.currentPage.set(page);
    this.findProducts();
  }

  nextPage() {
    this.currentPage.update((page) => Number(page) + 1);
    this.findProducts();
  }

  previousPage() {
    this.currentPage.update((page) => Number(page) - 1);
    this.findProducts();
  }

  getNextPage(): string {
    return (Number(this.currentPage()) + 1).toString();
  }

  getPreviousPage(): string {
    return (Number(this.currentPage()) - 1).toString();
  }

  private disabledNextBtn() {
    if (
      this.currentPage() >= Number(this.pageNumbers()) - 1 ||
      this.currentPage() > this.pageNumbers()
    )
      this.disabledNextButton.set(true);
    else this.disabledNextButton.set(false);
  }

  private disabledPreviousBtn() {
    if (this.currentPage() > 0) this.disabledPreviousButton.set(false);
    else this.disabledPreviousButton.set(true);
  }

  private configMessageAlert(message: string, messageType: string): void {
    //Mensage y estilo a mostrar en el alert
    this.notificationMessage.set(message);
    this.alertType.set(messageType);
  }

  get getDeleteProductId(): string {
    return this.deleteProductId();
  }

  set setDeleteProductId(productId: string) {
    this.deleteProductId.set(productId);
  }
}
