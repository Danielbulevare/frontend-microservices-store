import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { RecordTransaction } from '../../Entities/Models/RecordTransaction/record-transaction';
import { Inventory } from '../../Entities/Inventory/inventory';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  constructor(private httpClient: HttpClient) {}

  public productOutput(recordTransaction: RecordTransaction[], paymentMethod: string): Observable<Inventory[]> {
    return this.httpClient.post<Inventory[]>(
      `${environment.URL_BASE_INVENTORY}/output/${paymentMethod}`, recordTransaction
    );
  }
}
