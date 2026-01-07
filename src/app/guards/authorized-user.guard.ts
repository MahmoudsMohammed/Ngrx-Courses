import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { isLoggedInSelector } from "../auth/store/auth.selector";
import { map } from "rxjs/operators";

export const authorizedUserGuard: CanActivateFn = (route, state) => {
  const _store = inject(Store),
    _router = inject(Router);
  return _store
    .select(isLoggedInSelector)
    .pipe(map((value) => (value ? true : _router.createUrlTree(["/login"]))));
};
