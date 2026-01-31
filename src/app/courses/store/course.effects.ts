import { Injectable } from "@angular/core";
import { Actions } from "@ngrx/effects";

// No Need to ProvideIn root as it's create a singletone instance of it when add to effect module
@Injectable()
export class CoursesEffects {
  constructor(private actions$: Actions) {
    this.actions$.subscribe((action) =>
      console.log("From Courses Effects ===>", action),
    );
  }
}
