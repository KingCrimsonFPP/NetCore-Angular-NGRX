import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { Note } from "src/app/models/note.model";
import { BoardsStoreSelectors, BoardsStoreActions } from "src/app/root-store/boards-store";
import { Observable, Subscription } from "rxjs";
import { Store } from "@ngrx/store";
import { RootStoreState } from "src/app/root-store";
import { Board } from "src/app/models/board.model";

@Component({
  selector: "app-note",
  templateUrl: "./note.component.html",
  styleUrls: ["./note.component.css"],
})
export class NoteComponent implements OnInit, OnDestroy {
  @Input() noteId: number;
  @Input() boardId: number;

  note$: Observable<Note>;
  error$: Observable<any>;
  isLoading$: Observable<boolean>;

  editModel = new Note();

  constructor(private store$: Store<RootStoreState.RootState>) { }

  ngOnInit() {
    this.note$ = this.store$.select(BoardsStoreSelectors.selectNote(this.boardId, this.noteId));

    this.subscription = this.note$.subscribe(model => {
      if (!!model) {
        this.editModel.Title = model.Title;
        this.editModel.Description = model.Description;
      }
    });

    this.error$ = this.store$.select(BoardsStoreSelectors.selectError);

    this.isLoading$ = this.store$.select(BoardsStoreSelectors.selectIsLoading);
  }

  subscription: Subscription;
  ngOnDestroy() {
    if (this.subscription)
      this.subscription.unsubscribe();
  }

  save(model: Note) {
    model = { ...model, Title: this.editModel.Title, Description: this.editModel.Description };
    this.store$.dispatch(
      BoardsStoreActions.saveNoteRequest({
        boardId: this.boardId,
        payload: model,
      })
    );
  }

  delete(model: Note) {
    this.store$.dispatch(BoardsStoreActions.deleteNoteRequest({ boardId: model.BoardId, noteId: model.Id }));
  }

  cancel(model: Note) {
    if (model.IsNew) {
      this.store$.dispatch(BoardsStoreActions.removeNewNote({ boardId: model.BoardId, noteId: model.Id }));
    }
    else if (model.EditMode) {
      this.store$.dispatch(BoardsStoreActions.cancelEditNote({ boardId: model.BoardId, noteId: model.Id }));
    }
  }

  edit(model: Note) {
    this.editModel.Title = model.Title;
    this.editModel.Description = model.Description;
    this.store$.dispatch(BoardsStoreActions.editNote({ boardId: model.BoardId, noteId: model.Id }));
  }

  refresh() {
    this.store$.dispatch(BoardsStoreActions.loadRequest());
  }
}