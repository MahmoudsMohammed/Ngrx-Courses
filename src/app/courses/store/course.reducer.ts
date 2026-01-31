import { createReducer, on } from "@ngrx/store";
import { courseInitialState } from "./course.state";
import { coursesActions } from "./course.actions";
import { compareCourses } from "../model/course";

export const coursesReducer = createReducer(
  courseInitialState,
  on(coursesActions.coursesLoaded, (state, action) => {
    return [...action.courses].sort(compareCourses);
  }),
);
