// src/app/success-popup/success-popup.component.ts

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-success-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './success-popup.component.html',
  styleUrls: ['./success-popup.component.scss']
})
export class SuccessPopupComponent {
  @Input() message: string = 'Success!'; // Default message
  @Output() close = new EventEmitter<void>();

  onClose(): void {
    this.close.emit();
  }
}