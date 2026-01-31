import { createReducer } from "@ngrx/store";
import { courseInitialState } from "./course.state";

export const coursesReducer = createReducer(courseInitialState);
