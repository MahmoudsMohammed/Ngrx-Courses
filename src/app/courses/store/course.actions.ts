import { createAction, props } from "@ngrx/store";
import { Course } from "../model/course";
import { Update } from "@ngrx/entity";

const loadAllCourses = createAction("[Courses Resolver] Load Courses From API");
const coursesLoaded = createAction(
  "[Courses Effect] Update Courses State",
  props<{ courses: Course[] }>(),
);

const courseUpdate = createAction(
  "[Update Course Dialog] Update Course Info",
  props<{ courseUpdates: Update<Course> }>(),
);

export const coursesActions = { loadAllCourses, coursesLoaded, courseUpdate };
