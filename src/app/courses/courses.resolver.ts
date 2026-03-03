import { inject } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from "@angular/router";
import { Store } from "@ngrx/store";
import { coursesLoadedSelector } from "./store/course.selector";
import { filter, finalize, first, tap } from "rxjs/operators";
import { coursesActions } from "./store/course.actions";
import { CoursesEntity } from "./store/course.reducer";

export const coursesResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const _store = inject(Store<CoursesEntity>);
  let loading = false;
  return _store.select(coursesLoadedSelector).pipe(
    tap((data) => {
      if (!data && !loading) {
        _store.dispatch(coursesActions.loadAllCourses());
      }
    }),
    filter((data) => !data),
    first(),
    finalize(() => (loading = false)),
  );
};
