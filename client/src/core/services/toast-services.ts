import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToastServices {
  constructor() {
    this.createToastContainer();
  }

  private createToastContainer() {
    if (document.getElementById('toast-container')) return;
    const cotainer = document.createElement('div');
    cotainer.id = 'toast-container';
    cotainer.className = 'toast toast-bottom toast-end';
    document.body.appendChild(cotainer);
  }

  private createToastElement(message: string, alertClass: string, duration: number = 5000) {
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) return;

    const toast = document.createElement('div');

    console.log('Alert class:', alertClass); // Debug: verifica la clase generada
    toast.classList.add('alert', `${alertClass}`, 'shadow-lg');
    toast.innerHTML = `
      <span>${message}</span>
      <button class="ml-4 btn btn-sm btn-ghost">x</button>
    `;

    toast.querySelector('button')?.addEventListener('click', () => {
      toastContainer.removeChild(toast);
    });

    toastContainer.appendChild(toast);

    setTimeout(() => {
      if (toastContainer.contains(toast)) {
        toastContainer.removeChild(toast);
      }
    }, duration);
  }

  show(message: string, variant: 'success' | 'error' | 'warning' | 'info', duration?: number) {
    
    const alertClass = {
      success: 'alert-success',
      error: 'alert-error',
      warning: 'alert-warning',
      info: 'alert-info',
    }[variant];

    this.createToastElement(message, alertClass, duration);
  }
}
