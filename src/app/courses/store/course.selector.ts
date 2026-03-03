import { createSelector } from "@ngrx/store";
import { coursesFeature } from "./course.feature";
import { selectAll } from "./course.reducer";

// create selector 2 steps => define feature selector , projector {map} function
const selectAllCourses = createSelector(
  coursesFeature.selectCoursesState,
  selectAll,
);

export const beginnerCoursesSelector = createSelector(
  selectAllCourses,
  (courses) => courses.filter((course) => course.category === "BEGINNER"),
);
export const advancedCoursesSelector = createSelector(
  selectAllCourses,
  (courses) => courses.filter((course) => course.category === "ADVANCED"),
);
export const promoCountSelector = createSelector(
  selectAllCourses,
  (courses) => courses.filter((course) => course.promo).length,
);
export const coursesLoadedSelector = createSelector(
  coursesFeature.selectCoursesState,
  (state) => state.allCoursesLoaded,
);
