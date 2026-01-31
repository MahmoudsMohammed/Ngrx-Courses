import { createSelector } from "@ngrx/store";
import { coursesFeature } from "./course.feature";

// create selector 2 steps => define feature selector , projector {map} function
export const coursesSelector = createSelector(
  coursesFeature.selectCoursesState,
  (courses) => courses,
);
