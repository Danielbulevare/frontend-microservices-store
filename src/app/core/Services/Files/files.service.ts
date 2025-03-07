import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { UUID } from 'crypto';

@Injectable({
  providedIn: 'root',
})
export class FilesService {
  constructor(private httClient: HttpClient) {}

  public findProductPhotoFile(productId: UUID): Observable<Blob> {
    /*
    Como estamos recuperando un arreglos de bytes, debemos especificarle a Angular que no
    esperamos un json, sino bytes o blob, para esto se debe quitar de get<Blob> y solo dejar
    get(), y que el tipo de respuets sera blob en lugar de json { responseType: 'blob' }
    */

    return this.httClient.get(
      `${environment.URL_BASE_FILES}/findProductPhotoFile/${productId}`,
      { responseType: 'blob' }
    );
  }
}
