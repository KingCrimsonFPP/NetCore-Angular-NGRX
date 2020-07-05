import { Component, OnInit, Input } from "@angular/core";
import { Note } from "src/app/models/note.model";
import { BoardsStoreSelectors, BoardsStoreActions } from "src/app/root-store/boards-store";
import { Observable } from "rxjs";
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

  constructor(private store$: Store<RootStoreState.RootState>) { }

  ngOnInit() {
    this.note$ = this.store$.select(BoardsStoreSelectors.selectNote(this.boardId, this.noteId));

    this.error$ = this.store$.select(BoardsStoreSelectors.selectError);

    this.isLoading$ = this.store$.select(BoardsStoreSelectors.selectIsLoading);
  }

  saveNote() {
    var newNote = {
      ...new Note(),
      EditMode: true,
      New: true,
      BoardId: this.boardId,
    };

    this.store$.dispatch(
      BoardsStoreActions.saveNoteRequest({
        boardId: this.boardId,
        payload: newNote,
      })
    );
  }

  deleteNote() {
    this.store$.dispatch(BoardsStoreActions.deleteNoteRequest({ boardId: this.boardId, noteId: this.noteId }));
  }

  cancelNote() {
    this.store$.dispatch(BoardsStoreActions.removeNewNote({ boardId: this.boardId, noteId: this.noteId }));
  }
}