import { Component } from '@angular/core';
import { PaginationComponent } from '../../../Shared/components/pagination/pagination.component';

declare var bootstrap: any;

@Component({
  selector: 'app-list-products',
  imports: [PaginationComponent],
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.css',
})
export default class ListProductsComponent {
  constructor() {}
}
