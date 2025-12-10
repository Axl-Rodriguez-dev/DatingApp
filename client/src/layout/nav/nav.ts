import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AccountService } from '../../core/services/account-service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastServices } from '../../core/services/toast-services';

@Component({
  selector: 'app-nav',
  imports: [ReactiveFormsModule, RouterLink, RouterLinkActive],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  protected account = inject(AccountService);
  private fb = inject(FormBuilder);
  private toast = inject(ToastServices);
  private router = inject(Router);

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  login() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.account.login(this.form.getRawValue()).subscribe({
      next: () => {
        this.router.navigateByUrl('/members');
        this.toast.show('Login successful', 'success');
        this.form.reset();
      },
      error: (error) => {
        this.toast.show(error.error, 'error');
      },
    });
  }

  logout() {
    this.account.logout();
    this.router.navigateByUrl('/');
  }
}
