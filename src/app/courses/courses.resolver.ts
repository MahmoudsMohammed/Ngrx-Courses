import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";
import { CourseEntityService } from "./store/course.entity.service";
import { tap } from "rxjs/operators";

export const courseResolverFn: ResolveFn<boolean> = (route, state) => {
  const _courseEntityService = inject(CourseEntityService);
  _courseEntityService.getAll();
  return _courseEntityService.loaded$.pipe(tap((state) => console.log(state)));
};
