import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { routes } from 'src/app/lib/routes';
import { AuthService } from 'src/app/services/auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.loggedIn) {
    return true;
  }

  router.navigate([routes.login]);
  return false;
};
