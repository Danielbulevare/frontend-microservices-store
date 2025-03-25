import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertComponent } from '../../../Shared/components/alert/alert.component';

@Component({
  selector: 'app-add-product',
  imports: [ReactiveFormsModule, AlertComponent],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
})
export default class AddProductComponent {
  newProductForm = new FormGroup({
    product: new FormControl('', [Validators.required]),
    price: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(0|[1-9]\d*)(\.\d+)?$/), // Solo enteros o decimales positivos
    ]),
  });

  get product() {
    return this.newProductForm.get('product') as FormControl;
  }

  get price() {
    return this.newProductForm.get('price') as FormControl;
  }
}
