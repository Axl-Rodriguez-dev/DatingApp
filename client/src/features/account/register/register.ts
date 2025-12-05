import { Component, inject, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Members } from '../../../types/user';
import { AccountService } from '../../../core/services/account-service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
})
export class Register {
  cancelRegister = output<boolean>();
  private accountService = inject(AccountService);
  private fb = inject(FormBuilder);

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    displayName: ['', [Validators.required]],
  });

  register() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.accountService.register(this.form.getRawValue()).subscribe({
      next: (response) => {
        console.log('Registration successful', response);
        this.cancel();
      },
      error: (error) => alert('Registration failed ' + JSON.stringify(error.error)),
    });
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
