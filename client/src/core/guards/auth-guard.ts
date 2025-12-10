import { CanActivateFn } from '@angular/router';
import { AccountService } from '../services/account-service';
import { inject } from '@angular/core';
import { ToastServices } from '../services/toast-services';

export const authGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService);
  const toast = inject(ToastServices);

  if (accountService.currentUser()) return true;

  toast.show('You shall not pass! Please log in.', 'error');
  return false;
};
