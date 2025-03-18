import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ProductsService } from '../../../core/Services/Products/products.service';
import { Product } from '../../../core/Entities/Products/product';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-list-products',
  imports: [RouterModule],
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.css',
})
export default class ListProductsComponent implements OnInit {
  private productService = inject(ProductsService);

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

  constructor(private route: ActivatedRoute) {}

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

          this.disabledNextBtn();
          this.disabledPreviousBtn();
        },
        error: (response: any) => {
          this.configMessageAlert(response.error.message, 'alert-danger');

          console.log('Error al recuperar los productos: ' + response);
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
