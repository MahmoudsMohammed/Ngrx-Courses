import { ActionReducer, MetaReducer } from "@ngrx/store";

function loggerMetaReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    console.log("State From Meta Reducer ==>", state);
    console.log("Action From Meta Reducer ==>", action);
    return reducer(state, action);
  };
}

function syncStateToLS(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    const nextReducer = reducer(state, action);
    if (action.type !== "@ngrx/store/init") {
      localStorage.setItem("appState", JSON.stringify(nextReducer));
    }
    return nextReducer;
  };
}

export const appMetaReducers: MetaReducer<any>[] = [
  loggerMetaReducer,
  syncStateToLS,
];

export function getInitialAppState() {
  const appState = localStorage.getItem("appState");
  return appState ? JSON.parse(appState) : {};
}
