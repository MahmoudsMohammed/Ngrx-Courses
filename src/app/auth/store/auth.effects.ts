import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { AuthActions } from "./auth.actions";
import { tap } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class AuthEffects {
  constructor(private actions$: Actions) {}

  loginEffect = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginAction),
        tap((data) => localStorage.setItem("user", JSON.stringify(data.user)))
      ),
    {
      dispatch: false,
    }
  );
}
