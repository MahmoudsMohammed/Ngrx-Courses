import { Component, OnInit } from "@angular/core";
import { compareCourses, Course } from "../model/course";
import { Observable } from "rxjs";
import { defaultDialogConfig } from "../shared/default-dialog-config";
import { EditCourseDialogComponent } from "../edit-course-dialog/edit-course-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { filter, map, shareReplay, tap } from "rxjs/operators";
import { CoursesHttpService } from "../services/courses-http.service";
import { Store } from "@ngrx/store";
import { CoursesEntity } from "../store/course.reducer";
import {
  advancedCoursesSelector,
  beginnerCoursesSelector,
  promoCountSelector,
} from "../store/course.selector";

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
  standalone: false,
})
export class HomeComponent implements OnInit {
  promoTotal$: Observable<number>;

  loading$: Observable<boolean>;

  beginnerCourses$: Observable<Course[]>;

  advancedCourses$: Observable<Course[]>;

  constructor(
    private dialog: MatDialog,
    private coursesHttpService: CoursesHttpService,
    private _store: Store,
  ) {}

  ngOnInit() {
    this.reload();
  }

  reload() {
    this.beginnerCourses$ = this._store.select(beginnerCoursesSelector);
    this.advancedCourses$ = this._store.select(advancedCoursesSelector);
    this.promoTotal$ = this._store.select(promoCountSelector);
  }

  onAddCourse() {
    const dialogConfig = defaultDialogConfig();

    dialogConfig.data = {
      dialogTitle: "Create Course",
      mode: "create",
    };

    this.dialog.open(EditCourseDialogComponent, dialogConfig);
  }
}
