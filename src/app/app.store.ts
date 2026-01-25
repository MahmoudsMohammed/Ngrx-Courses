import { ActionReducer, MetaReducer } from "@ngrx/store";
import { localStorageSync } from "ngrx-store-localstorage";

function loggerMetaReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    console.log("State From Meta Reducer ==>", state);
    console.log("Action From Meta Reducer ==>", action);
    return reducer(state, action);
  };
}

// function syncStateToLS(reducer: ActionReducer<any>): ActionReducer<any> {
//   return (state, action) => {
//     const nextReducer = reducer(state, action);
//     if (action.type !== "@ngrx/store/init") {
//       localStorage.setItem("appState", JSON.stringify(nextReducer));
//     }
//     return nextReducer;
//   };
// }

function ngrxLsStore(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({
    keys: [
      "auth", // define state to be persist or part of the state
      // { user: ["profile", "preferences"] }, // only persist specific properties
    ],
    rehydrate: true, // refetch data from LS and set at state after page reload
    storage: localStorage, // define place to store on it can be (LS , SS , IDB)
  })(reducer);
}

export const appMetaReducers: MetaReducer<any>[] = [
  loggerMetaReducer,
  ngrxLsStore,
];

export function getInitialAppState() {
  const appState = localStorage.getItem("appState");
  return appState ? JSON.parse(appState) : {};
}
