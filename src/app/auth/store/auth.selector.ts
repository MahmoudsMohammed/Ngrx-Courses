import { createFeatureSelector, createSelector } from "@ngrx/store";
import { User } from "../model/user.model";

const authState = createFeatureSelector<User>("auth");

export const isLoggedInSelector = createSelector(
  authState,
  (state) => !!state.email
);
// !isLoggedInSelector => can't negate selector instead make selector map value then continue the logic in another map function
export const isLoggedOutSelector = createSelector(
  isLoggedInSelector,
  (loggedIn) => !loggedIn
);
