import { inject } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from "@angular/router";
import { Store } from "@ngrx/store";
import { coursesSelector } from "./store/course.selector";
import { tap } from "rxjs/operators";
import { coursesActions } from "./store/course.actions";

export const coursesResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const _store = inject(Store);
  return _store.select(coursesSelector).pipe(
    tap((data) => {
      if (!data.length) {
        _store.dispatch(coursesActions.loadAllCourses());
      }
    }),
  );
};
