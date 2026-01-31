import { createAction, props } from "@ngrx/store";
import { Course } from "../model/course";

const loadAllCourses = createAction("[Courses Resolver] Load Courses From API");
const coursesLoaded = createAction(
  "[Courses Effect] Update Courses State",
  props<{ courses: Course[] }>(),
);

export const coursesActions = { loadAllCourses, coursesLoaded };
