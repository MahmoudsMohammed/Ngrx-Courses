import { Injectable } from "@angular/core";
import { DefaultDataService, HttpOptions, HttpUrlGenerator } from "@ngrx/data";
import { Course } from "../model/course";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { CoursesHttpService } from "../services/courses-http.service";
import { map } from "rxjs/operators";

@Injectable({ providedIn: "any" })
export class CoursesDataService extends DefaultDataService<Course> {
  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
    super("courses", http, httpUrlGenerator);
  }

  getAll(options?: HttpOptions): Observable<Course[]> {
    console.log("################# From Get ALL #################");
    return this.http
      .get("/api/courses")
      .pipe(map((res: any) => res["payload"]));
  }
}
