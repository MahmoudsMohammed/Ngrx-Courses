import { createReducer, on } from "@ngrx/store";
import { coursesActions } from "./course.actions";
import { Course } from "../model/course";
import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";

export interface CoursesEntity extends EntityState<Course> {
  allCoursesLoaded: boolean;
}
const coursesAdapter: EntityAdapter<Course> = createEntityAdapter<Course>({});
const initialCourseState: CoursesEntity = coursesAdapter.getInitialState({
  allCoursesLoaded: false,
});

export const { selectAll } = coursesAdapter.getSelectors();

export const coursesReducer = createReducer(
  initialCourseState,
  on(coursesActions.coursesLoaded, (state, action) =>
    coursesAdapter.setAll(action.courses, { ...state, allCoursesLoaded: true }),
  ),
);
