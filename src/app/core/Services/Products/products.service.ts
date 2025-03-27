import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Product } from '../../Entities/Products/product';
import { SaveProduct } from '../../Entities/Products/save-product';
import { ResponseProduct } from '../../Entities/Products/response-product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private httpClient: HttpClient) {}

  public getTotalProducts(): Observable<number> {
    return this.httpClient.get<number>(`${environment.URL_BASE_PRODUCTS}`);
  }

  public findProducts(page: number, records: number): Observable<Product[]> {
    return this.httpClient.get<Product[]>(
      `${environment.URL_BASE_PRODUCTS}/${page}/${records}`
    );
  }

  public deleteProduct(productId: string): Observable<boolean> {
    return this.httpClient.delete<boolean>(
      `${environment.URL_BASE_PRODUCTS}/${productId}`
    );
  }

  public saveProduct(product: SaveProduct): Observable<ResponseProduct> {
    return this.httpClient.post<ResponseProduct>(
      `${environment.URL_BASE_PRODUCTS}`,
      product
    );
  }
}
