import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  imports: [],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css',
})
export class AlertComponent {
  @Input() message: string = '';
  @Input() alertType: string = '';

  getIco(): string {
    switch (this.alertType) {
      case 'alert-primary':
        return '#info-fill';
      case 'alert-success':
        return '#check-circle-fill';
      case 'alert-warning':
        return '#exclamation-triangle-fill';
      case 'alert-danger':
        return '#exclamation-triangle-fill';
      default:
        return '';
    }
  }

  getAriaLabel(): string {
    switch (this.alertType) {
      case 'alert-primary':
        return 'Info:';
      case 'alert-success':
        return 'Success:';
      case 'alert-warning':
        return 'Warning:';
      case 'alert-danger':
        return 'Danger:';
      default:
        return '';
    }
  }
}
