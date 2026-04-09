import { Injectable } from "@angular/core";
import { DefaultDataService, HttpOptions, HttpUrlGenerator } from "@ngrx/data";
import { Course } from "../model/course";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { CoursesHttpService } from "../services/courses-http.service";
import { map } from "rxjs/operators";
import { Update } from "@ngrx/entity";

@Injectable({ providedIn: "any" })
export class CoursesDataService extends DefaultDataService<Course> {
  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
    super("courses", http, httpUrlGenerator);
  }

  getAll(options?: HttpOptions): Observable<Course[]> {
    return this.http
      .get("/api/courses")
      .pipe(map((res: any) => res["payload"]));
  }

  update(update: Update<Course>, options?: HttpOptions): Observable<Course> {
    return this.http.put<Course>("/api/course/" + update.id, update.changes);
  }

  add(entity: Course, options?: HttpOptions): Observable<Course> {
    return this.http.post<Course>("/api/course", entity);
  }
}
