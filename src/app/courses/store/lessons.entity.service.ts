import { Injectable } from "@angular/core";
import { Lesson } from "../model/lesson";
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from "@ngrx/data";

@Injectable()
export class LessonsEntity extends EntityCollectionServiceBase<Lesson> {
  constructor(
    private serviceElementsFactory: EntityCollectionServiceElementsFactory,
  ) {
    super("lessons", serviceElementsFactory);
  }
}
