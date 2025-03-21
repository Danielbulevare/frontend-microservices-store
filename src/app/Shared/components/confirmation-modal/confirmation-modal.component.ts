import { Component, EventEmitter, inject, Input, Output, signal } from '@angular/core';
import { error } from 'console';
import { UUID } from 'crypto';
import { response } from 'express';

@Component({
  selector: 'app-confirmation-modal',
  imports: [],
  templateUrl: './confirmation-modal.component.html',
  styleUrl: './confirmation-modal.component.css',
})
export class ConfirmationModalComponent {
  @Input() modalTitle: string = '';
  @Input() modalMessage: string = '';

  @Output() confirmAction: EventEmitter<boolean> = new EventEmitter<boolean>();

  public confirm() {
    this.confirmAction.emit(true);
  }
}
