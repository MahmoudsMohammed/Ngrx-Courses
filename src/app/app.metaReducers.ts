import { ActionReducer } from "@ngrx/store";

export function loggerMetaReducer(
  reducer: ActionReducer<any>,
): ActionReducer<any> {
  return (state, action) => {
    console.log("State From Meta Reducer ==>", state);
    console.log("Action From Meta Reducer ==>", action);
    return reducer(state, action);
  };
}
