import { Injectable } from "@angular/core";
import { CoursesHttpService } from "../services/courses-http.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { coursesActions } from "./course.actions";
import { map, switchMap, tap } from "rxjs/operators";

// No Need to ProvideIn root as it's create a singletone instance of it when add to effect module
@Injectable()
export class CoursesEffects {
  constructor(
    private _coursesHttpService: CoursesHttpService,
    private _actions: Actions,
  ) {}

  // map into action so not set dispatch with false
  loadAllCourses = createEffect(() =>
    this._actions.pipe(
      ofType(coursesActions.loadAllCourses),
      tap(() => console.log("Load All courses Action Dispatched")),
      switchMap(() =>
        this._coursesHttpService
          .findAllCourses()
          .pipe(map((data) => coursesActions.coursesLoaded({ courses: data }))),
      ),
    ),
  );

  updateCourseData = createEffect(
    () => {
      return this._actions.pipe(
        ofType(coursesActions.courseUpdate),
        switchMap((action) => {
          return this._coursesHttpService.saveCourse(
            action.courseUpdates.id,
            action.courseUpdates.changes,
          );
        }),
      );
    },
    {
      dispatch: false,
    },
  );
}
