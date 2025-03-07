import { Component, computed, OnInit, signal } from '@angular/core';
import { ProductsService } from '../../../core/Services/Products/products.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Product } from '../../../core/Entities/Products/product';
import { FilesService } from '../../../core/Services/Files/files.service';
import { UUID } from 'crypto';
import { AlertComponent } from '../../../Shared/components/alert/alert.component';

@Component({
  selector: 'app-store',
  imports: [RouterModule, AlertComponent],
  templateUrl: './store.component.html',
  styleUrl: './store.component.css',
})
export default class StoreComponent implements OnInit {
  private readonly numbersRecords: number = 8;

  errorMessage = signal('');
  alertType = signal('');
  products: Product[] = [];

  disabledNextButton = signal(true);
  disabledPreviousButton = signal(true);
  currentPage = signal(0);
  totalProducts = signal(0);
  pageNumbers = computed(() =>
    Math.ceil(this.totalProducts() / this.numbersRecords)
  );

  constructor(
    private productService: ProductsService,
    private fileProductService: FilesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    /*Es necesario poner este condicional, ya que al parecer Keycloak o el token
    que se envia en la cabecera del endpoint se ejecuta antes de que se haya cargado el
    componente y provocaría un error.
    */
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
        this.configMessageAlert(response.error.message, 'alert-danger');
        console.log('Error al recuperar el total de productos: ' + response);
      },
    });
  }

  private findProducts() {
    this.productService
      .findProducts(this.currentPage(), this.numbersRecords)
      .subscribe({
        next: (response: Product[]) => {
          this.products = response;

          this.products.forEach((product) =>
            this.findProductPhotoFile(product.id)
          );

          this.disabledNextBtn();
          this.disabledPreviousBtn();
        },
        error: (response: any) => {
          this.configMessageAlert(response.error.message, 'alert-danger');

          console.log('Error al recuperar los productos: ' + response);
        },
      });
  }

  private findProductPhotoFile(productId: UUID) {
    this.fileProductService.findProductPhotoFile(productId).subscribe({
      next: (response: Blob) => {
        this.products
          .filter((product) => product.id === productId)
          .forEach(
            /*Convierte los bytes de la imagen que recuperamos de la base de datos, en una url
            para que se pueda mostrar en la etiqueta img*/
            (product) => {
              product.urlImg = URL.createObjectURL(response);
            }
          );
      },
      error: (response: any) => {
        this.configMessageAlert('No se pudo recuperar la imagen del producto.', 'alert-warning');

        console.log('Error al recuperar la imagen del producto: ' + response);
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
    this.errorMessage.set(message);
    this.alertType.set(messageType);
  }
}
