import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from "@angular/router";

export const coursesResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  console.log("Activated Route ==>", route);
  console.log("Route State ==>", state);
};
