import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Note } from "src/app/models/note.model";
import { Board } from "src/app/models/board.model";
import { Store } from "@ngrx/store";
import {
  RootStoreState,
  BoardsStoreSelectors,
  BoardsStoreActions,
} from "src/app/root-store";
import { Observable } from "rxjs";

@Component({
  selector: "app-board",
  templateUrl: "./board.component.html",
  styleUrls: ["./board.component.css"],
})
export class BoardComponent implements OnInit {
  @Input() boardId: number;
  board$: Observable<Board>;
  error$: Observable<any>;
  isLoading$: Observable<boolean>;

  constructor(private store$: Store<RootStoreState.RootState>) {}

  ngOnInit() {
    this.board$ = this.store$.select(
      BoardsStoreSelectors.selectBoard(this.boardId)
    );

    this.error$ = this.store$.select(BoardsStoreSelectors.selectError);

    this.isLoading$ = this.store$.select(BoardsStoreSelectors.selectIsLoading);
  }

  addNote() {
    this.store$.dispatch(
      BoardsStoreActions.addNewNote({boardId: this.boardId})
    );
  }

  deleteBoard() {
    this.store$.dispatch(BoardsStoreActions.deleteBoardRequest({ id: this.boardId }));
  }
}