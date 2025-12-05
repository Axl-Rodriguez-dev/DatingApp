import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AccountService } from '../../core/services/account-service';

@Component({
  selector: 'app-nav',
  imports: [ReactiveFormsModule],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  protected account = inject(AccountService);
  private fb = inject(FormBuilder);
  protected creds: any = {};

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
      next: (response) => {
        console.log('Login successful', response);
        this.creds = {};
      },
      error: (error) => alert(error.message),
    });
  }

  logout() {
    this.account.logout();
  }
}
