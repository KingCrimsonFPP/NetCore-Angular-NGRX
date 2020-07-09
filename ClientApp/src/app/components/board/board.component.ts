import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from "@angular/core";
import { Board } from "src/app/models/board.model";
import { Store } from "@ngrx/store";
import {
  RootStoreState,
  BoardsStoreSelectors,
  BoardsStoreActions,
} from "src/app/root-store";
import { Observable, Subscription } from "rxjs";
import { Note } from "src/app/models/note.model";

@Component({
  selector: "app-board",
  templateUrl: "./board.component.html",
  styleUrls: ["./board.component.css"],
})
export class BoardComponent implements OnInit, OnDestroy {
  @Input() boardId: number;

  board$: Observable<Board>;
  error$: Observable<any>;
  isLoading$: Observable<boolean>;

  editModel = new Note();

  constructor(private store$: Store<RootStoreState.RootState>) { }

  ngOnInit() {
    this.board$ = this.store$.select(BoardsStoreSelectors.selectBoard(this.boardId));

    this.subscription = this.board$.subscribe(model => this.editModel.Title = model.Title);

    this.error$ = this.store$.select(BoardsStoreSelectors.selectError);

    this.isLoading$ = this.store$.select(BoardsStoreSelectors.selectIsLoading);
  }

  subscription: Subscription;
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  refresh() {
    this.store$.dispatch(BoardsStoreActions.loadRequest());
  }

  addNote(model: Board) {
    this.store$.dispatch(
      BoardsStoreActions.addNewNote({ boardId: model.Id })
    );
  }

  cancelBoard(model: Board) {
    if (model.IsNew) {
      this.store$.dispatch(BoardsStoreActions.removeNewBoard({ id: model.Id }));
    }
    else if (model.EditMode) {
      this.store$.dispatch(BoardsStoreActions.cancelEditBoard({ id: model.Id }));
    }
  }

  editBoard(model: Board) {
    this.editModel.Title = model.Title
    this.store$.dispatch(BoardsStoreActions.editBoard({ id: model.Id }));
  }

  saveBoard(model: Board) {
    model = { ...model, Title: this.editModel.Title };
    this.store$.dispatch(BoardsStoreActions.saveBoardRequest({ payload: model }));
  }

  deleteBoard(model: Board) {
    this.store$.dispatch(BoardsStoreActions.deleteBoardRequest({ id: model.Id }));
  }
}