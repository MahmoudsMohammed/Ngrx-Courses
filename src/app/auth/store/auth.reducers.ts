import { createReducer, on } from "@ngrx/store";
import { initialAuthState } from "./auth.state";
import { AuthActions } from "./auth.actions";

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.loginAction, (state, action) => {
    return { ...action.user };
  }),
  on(AuthActions.logoutAction, (state, action) => {
    return {
      email: "",
      id: "",
    };
  })
);
