import { createAction, props } from "@ngrx/store";
import { User } from "../model/user.model";

const loginAction = createAction(
  "[Login Page] User Login",
  props<{ user: User }>()
);
const logoutAction = createAction("[Side Menu] User Logout");

export const AuthActions = { loginAction, logoutAction };
