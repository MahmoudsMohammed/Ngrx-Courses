import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Course, DialogModes } from "../model/course";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { CoursesHttpService } from "../services/courses-http.service";
import { CourseEntityService } from "../store/course.entity.service";
import { finalize, tap } from "rxjs/operators";

@Component({
  selector: "course-dialog",
  templateUrl: "./edit-course-dialog.component.html",
  styleUrls: ["./edit-course-dialog.component.css"],
  standalone: false,
})
export class EditCourseDialogComponent {
  form!: FormGroup;

  dialogTitle: string;

  course: Course;

  mode: DialogModes;

  loading$!: Observable<boolean>;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditCourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: any,
    private _courseEntityService: CourseEntityService,
  ) {
    this.dialogTitle = data.dialogTitle;
    this.course = data.course;
    this.mode = data.mode;

    const formControls = {
      description: ["", Validators.required],
      category: ["", Validators.required],
      longDescription: ["", Validators.required],
      promo: ["", []],
    };

    if (this.mode == "update") {
      this.form = this.fb.group(formControls);
      this.form.patchValue({ ...data.course });
    } else if (this.mode == "create") {
      this.form = this.fb.group({
        ...formControls,
        url: ["", Validators.required],
        iconUrl: ["", Validators.required],
      });
    }
  }

  onClose() {
    this.dialogRef.close();
  }

  onSave() {
    const course: Course = {
      ...this.course,
      ...this.form.value,
    };
    let dataObservable!: Observable<Course>;
    if (this.mode === "update") {
      dataObservable = this._courseEntityService.update(course);
    } else if (this.mode === "create") {
      dataObservable = this._courseEntityService.add(course);
    }
    this.closeDialogAfterSave(dataObservable);
  }

  private closeDialogAfterSave(actionObservable: Observable<Course>) {
    actionObservable
      .pipe(
        finalize(() => {
          this.dialogRef.close();
        }),
      )
      .subscribe();
  }
}
