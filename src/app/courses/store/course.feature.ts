import { createFeature } from "@ngrx/store";
import { coursesReducer } from "./course.reducer";

export const coursesFeature = createFeature({
  name: "courses",
  reducer: coursesReducer,
});
