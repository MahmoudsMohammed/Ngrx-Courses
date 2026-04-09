import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";
import { CourseEntityService } from "./store/course.entity.service";
import { first, tap } from "rxjs/operators";

export const courseResolverFn: ResolveFn<boolean> = (route, state) => {
  const _courseEntityService = inject(CourseEntityService);
  return _courseEntityService.loaded$.pipe(
    tap((loaded) => {
      if (!loaded) {
        _courseEntityService.getAll();
      }
    }),
    first(),
  );
};
