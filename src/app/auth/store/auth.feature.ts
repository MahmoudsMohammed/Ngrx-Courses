import { createFeature } from "@ngrx/store";
import { authReducer } from "./auth.reducers";

export const authFeature = createFeature({
  name: "auth",
  reducer: authReducer,
});
