import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { Note } from "src/app/models/note.model";
import { BoardsStoreSelectors, BoardsStoreActions } from "src/app/root-store/boards-store";
import { Observable, Subscription } from "rxjs";
import { Store } from "@ngrx/store";
import { RootStoreState } from "src/app/root-store";

@Component({
  selector: "app-note",
  templateUrl: "./note.component.html",
  styleUrls: ["./note.component.css"],
})
export class NoteComponent implements OnInit {
  @Input() noteId: number;
  @Input() boardId: number;

  note$: Observable<Note>;
  error$: Observable<any>;
  isLoading$: Observable<boolean>;

  editedTitle: string;
  editedDescription: string;

  constructor(private store$: Store<RootStoreState.RootState>) { }

  ngOnInit() {
    this.note$ = this.store$.select(BoardsStoreSelectors.selectNote(this.boardId, this.noteId));

    this.error$ = this.store$.select(BoardsStoreSelectors.selectError);

    this.isLoading$ = this.store$.select(BoardsStoreSelectors.selectIsLoading);
  }

  saveNote(model: Note) {
    model = { ...model, Title: this.editedTitle, Description: this.editedDescription };
    this.store$.dispatch(
      BoardsStoreActions.saveNoteRequest({
        boardId: this.boardId,
        payload: model,
      })
    );
  }

  deleteNote(model: Note) {
    this.store$.dispatch(BoardsStoreActions.deleteNoteRequest({ boardId: model.BoardId, noteId: model.Id }));
  }



  cancelNote(model: Note) {
    if (model.IsNew) {
      this.store$.dispatch(BoardsStoreActions.removeNewNote({ boardId: model.BoardId, noteId: model.Id }));
    }
    else if (model.EditMode) {
      this.store$.dispatch(BoardsStoreActions.cancelEditNote({ boardId: model.BoardId, noteId: model.Id }));
    }
  }

  editBoard(model: Note) {
    this.editedTitle = model.Title;
    this.editedDescription = model.Description;
    this.store$.dispatch(BoardsStoreActions.editNote({ boardId: model.BoardId, noteId: model.Id }));
  }

  refresh() {
    this.store$.dispatch(BoardsStoreActions.loadRequest());
  }
}