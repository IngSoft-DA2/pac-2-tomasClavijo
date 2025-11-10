import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CounterService } from './counter.service';

export const reflectionGuard: CanActivateFn = (route, state) => {
  const counter = inject(CounterService);
  const router = inject(Router);

  const current = counter.incrementReflection();
  if (current > 20) {
    return router.parseUrl('/');
  }
  return true;
};

