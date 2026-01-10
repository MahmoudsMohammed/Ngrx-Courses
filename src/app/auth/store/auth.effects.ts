import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { AuthActions } from "./auth.actions";
import { map, tap } from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable({ providedIn: "root" })
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private _router: Router,
    private _store: Store
  ) {}

  loginEffect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginAction),
        tap((data) => localStorage.setItem("user", JSON.stringify(data.user)))
      ),
    {
      dispatch: false,
    }
  );

  logoutEffect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logoutAction),
        tap((data) => {
          localStorage.removeItem("user");
          this._router.navigate(["/login"]);
        })
      ),
    {
      dispatch: false,
    }
  );

  loadUserDataFormLS$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.userDataFromLS),
      map((data) => {
        const userInfo = JSON.parse(localStorage.getItem("user"));
        return AuthActions.loginAction({ user: userInfo });
      })
    )
  );
}
