// custom-toast.component.ts
import { Component } from '@angular/core';
import { Toast, ToastrService, ToastPackage } from 'ngx-toastr';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
    selector: '[custom-toast-component]',
    styles: [`
    :host {
      position: relative;
      overflow: hidden;
      margin: 0 0 10px;
      padding: 16px 18px;
      width: 300px;
      border-radius: 12px;
      box-shadow: 0 12px 28px rgba(0, 0, 0, 0.12), 0 4px 10px rgba(0, 0, 0, 0.08);
      color: #fff;
      display: flex;
      flex-direction: column;
      pointer-events: auto;
      transition: all 0.3s ease;
    }
    
    :host:hover {
      transform: translateY(-2px);
      box-shadow: 0 16px 32px rgba(0, 0, 0, 0.15), 0 6px 14px rgba(0, 0, 0, 0.1);
    }
    
    :host::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background: linear-gradient(to right, rgba(255,255,255,0.2), rgba(255,255,255,0.7));
    }
    
    .toast-title {
      font-weight: 700;
      font-size: 16px;
      margin-bottom: 8px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .toast-message {
      font-size: 14px;
      line-height: 1.6;
      opacity: 0.9;
    }
    
    .close-button {
      position: absolute;
      top: 10px;
      right: 10px;
      background: transparent;
      border: none;
      color: white;
      opacity: 0.7;
      padding: 4px;
      cursor: pointer;
      transition: opacity 0.2s ease;
    }
    
    .close-button:hover {
      opacity: 1;
    }
    
    .toast-icon {
      width: 22px;
      height: 22px;
    }
    
    .toast-progress {
      position: absolute;
      bottom: 0;
      left: 0;
      height: 4px;
      background: rgba(255, 255, 255, 0.5);
    }
  `],
    template: `
    <div [class]="toastClasses" [style.background]="getBackground()">
      <div class="toast-title">
        <svg *ngIf="isSuccess()" class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
        <svg *ngIf="isError()" class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="15" y1="9" x2="9" y2="15"></line>
          <line x1="9" y1="9" x2="15" y2="15"></line>
        </svg>
        <svg *ngIf="isInfo()" class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="16" x2="12" y2="12"></line>
          <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>
        <svg *ngIf="isWarning()" class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
          <line x1="12" y1="9" x2="12" y2="13"></line>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
        {{ title }}
      </div>
      <div class="toast-message">{{ message }}</div>
      <button *ngIf="options.closeButton" (click)="remove()" class="close-button">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
      <div class="toast-progress" [style.width]="progressWidth + '%'"></div>
    </div>
  `,
    animations: [
        trigger('flyInOut', [
            state('inactive', style({ opacity: 0, transform: 'translateY(-15px)' })),
            state('active', style({ opacity: 1, transform: 'translateY(0)' })),
            state('removed', style({ opacity: 0, transform: 'translateY(-15px)' })),
            transition('inactive => active', animate('300ms ease-in')),
            transition('active => removed', animate('300ms ease-out'))
        ])
    ]
})
export class CustomToastComponent extends Toast {
    progressWidth = 100;
    interval: any;

    constructor(
        protected override toastrService: ToastrService,
        public override toastPackage: ToastPackage
    ) {
        super(toastrService, toastPackage);
        this.startProgressCountdown();
    }

    startProgressCountdown() {
        if (this.options.timeOut > 0) {
            this.interval = setInterval(() => {
                this.progressWidth = this.progressWidth - (100 / (this.options.timeOut / 100));
                if (this.progressWidth <= 0) {
                    clearInterval(this.interval);
                }
            }, 100);
        }
    }

    getBackground(): string {
        if (this.isSuccess()) return 'linear-gradient(135deg, #10b981, #059669)';
        if (this.isError()) return 'linear-gradient(135deg, #ef4444, #dc2626)';
        if (this.isInfo()) return 'linear-gradient(135deg, #4361ee, #3a56d4)';
        if (this.isWarning()) return 'linear-gradient(135deg, #f59e0b, #d97706)';
        return '#4361ee';
    }

    isSuccess(): boolean {
        return this.toastPackage.toastType === 'success';
    }

    isError(): boolean {
        return this.toastPackage.toastType === 'error';
    }

    isInfo(): boolean {
        return this.toastPackage.toastType === 'info';
    }

    isWarning(): boolean {
        return this.toastPackage.toastType === 'warning';
    }

    override remove() {
        if (this.interval) {
            clearInterval(this.interval);
        }
        super.remove();
    }
}