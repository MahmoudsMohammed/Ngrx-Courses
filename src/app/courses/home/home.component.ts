import { Component, OnInit } from "@angular/core";
import { compareCourses, Course } from "../model/course";
import { Observable } from "rxjs";
import { defaultDialogConfig } from "../shared/default-dialog-config";
import { EditCourseDialogComponent } from "../edit-course-dialog/edit-course-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { map, shareReplay } from "rxjs/operators";
import { CourseEntityService } from "../store/course.entity.service";

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
  standalone: false,
})
export class HomeComponent implements OnInit {
  promoTotal$!: Observable<number>;

  loading$!: Observable<boolean>;

  beginnerCourses$!: Observable<Course[]>;

  advancedCourses$!: Observable<Course[]>;

  constructor(
    private dialog: MatDialog,
    private _courseEntityService: CourseEntityService,
  ) {}

  ngOnInit() {
    this.reload();
  }

  reload() {
    const courses$ = this._courseEntityService.entities$.pipe(shareReplay());

    this.loading$ = this._courseEntityService.loading$;

    this.beginnerCourses$ = courses$.pipe(
      map((courses) =>
        courses.filter((course) => course.category == "BEGINNER"),
      ),
    );

    this.advancedCourses$ = courses$.pipe(
      map((courses) =>
        courses.filter((course) => course.category == "ADVANCED"),
      ),
    );

    this.promoTotal$ = courses$.pipe(
      map((courses) => courses.filter((course) => course.promo).length),
    );
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
