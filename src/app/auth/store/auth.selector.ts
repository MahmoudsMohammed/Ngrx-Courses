import { createFeatureSelector, createSelector } from "@ngrx/store";
import { User } from "../model/user.model";
import { authFeature } from "./auth.feature";

const authState = createFeatureSelector<User>("auth");

export const isLoggedInSelector = createSelector(
  authFeature.selectAuthState,
  (state) => !!state.email
);
// !isLoggedInSelector => can't negate selector instead make selector map value then continue the logic in another map function
export const isLoggedOutSelector = createSelector(
  isLoggedInSelector,
  (loggedIn) => !loggedIn
);
