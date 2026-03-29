import { createReducer, on } from "@ngrx/store";
import { coursesActions } from "./course.actions";
import { compareCourses, Course } from "../model/course";
import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";

export interface CoursesEntity extends EntityState<Course> {
  allCoursesLoaded: boolean;
}
const coursesAdapter: EntityAdapter<Course> = createEntityAdapter<Course>({
  sortComparer: compareCourses,
  selectId: (course) => course.id, // if entity id not called id direct aka different format
});
const initialCourseState: CoursesEntity = coursesAdapter.getInitialState({
  allCoursesLoaded: false,
});

export const { selectAll } = coursesAdapter.getSelectors();

export const coursesReducer = createReducer(
  initialCourseState,
  on(coursesActions.coursesLoaded, (state, action) =>
    coursesAdapter.setAll(action.courses, { ...state, allCoursesLoaded: true }),
  ),
  on(coursesActions.courseUpdate, (state, action) =>
    coursesAdapter.updateOne(action.courseUpdates, state),
  ),
);
