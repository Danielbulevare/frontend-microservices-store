import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  signal,
  ViewChild,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AlertComponent } from '../../../Shared/components/alert/alert.component';
import { SaveProduct } from '../../../core/Entities/Products/save-product';
import { ProductsService } from '../../../core/Services/Products/products.service';
import { After } from 'v8';
import { ResponseProduct } from '../../../core/Entities/Products/response-product';

@Component({
  selector: 'app-add-product',
  imports: [ReactiveFormsModule, AlertComponent],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
})
export default class AddProductComponent implements AfterViewInit {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  @ViewChild('txtName') txtName: any;

  private saveProductService = inject(ProductsService);

  errorMessage = signal('');
  alertType = signal('');
  notificationMessage = signal('');

  private timeoutId: NodeJS.Timeout | null = null;

  selectImage: string | ArrayBuffer | null = null; // Guarda la URL de la imagen

  newProductForm = new FormGroup({
    product: new FormControl('', [Validators.required]),
    price: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(0|[1-9]\d*)(\.\d+)?$/), // Solo enteros o decimales positivos
    ]),
    productPhoto: new FormControl(''),
  });

  ngAfterViewInit(): void {
    this.txtName.nativeElement.focus(); //Se enfoca en el campo de nombre
  }

  private showMessage(message: string, alert: string, duration: number) {
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

  get product() {
    return this.newProductForm.get('product') as FormControl;
  }

  get price() {
    return this.newProductForm.get('price') as FormControl;
  }

  get productPhoto() {
    return this.newProductForm.get('productPhoto') as FormControl;
  }

  saveProduct() {
    // Guarda el producto en la base de datos
    if (this.newProductForm.invalid) {
      this.showMessage(
        'Por favor, completa los campos obligatorios del formulario.',
        'alert-danger',
        3000
      );
      return;
    }

    // Crear un objeto SaveProduct con los datos del formulario
    const product: SaveProduct = {
      name: this.product.value,
      price: this.price.value,
    };

    this.saveProductService.saveProduct(product).subscribe({
      next: (response:ResponseProduct) => {
        this.showMessage(
          `El producto ha sido guardado correctamente con el ID: ${response.id}.`,
          'alert-success',
          5000
        );

        // Limpiar el formulario
        this.newProductForm.reset();
        this.txtName.nativeElement.focus();
        this.selectImage = null;
      },
      error: (response: any) => {
        this.showMessage(`Error al guardar el producto.`, 'alert-danger', 5000);
        console.log('Error: ' + response);
      },
    });
  }

  openFileSelector() {
    // Abre el selector de archivos
    this.fileInput.nativeElement.click(); // Simula clic en el input del archivo
  }

  onFileSelected(event: any) {
    // Captura el archivo seleccionado y muestra la vista previa

    const file = event.target.files[0];
    if (file) {
      const allowedTypes = [
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/svg+xml',
      ]; // Tipos de archivos permitidos

      if (!allowedTypes.includes(file.type)) {
        this.showMessage(
          `Solo puedes seleccionar archivos de imagen (JPG, PNG GIF o SVG).`,
          'alert-danger',
          3000
        );

        this.productPhoto.reset(); //Limpiar el campo de la imagen
        this.selectImage = null; //Limpiar la vista previa para que se muestre la imagen por defecto
        return;
      }

      const reader = new FileReader();

      // Leer el archivo y mostrarlo en la etiqueta <img>
      reader.onload = (e) => {
        // Validar si el resultado no es undefined
        if (e.target?.result !== undefined) {
          this.selectImage = e.target.result as string | ArrayBuffer;
        }
      };

      reader.readAsDataURL(file);
    }
  }
}
