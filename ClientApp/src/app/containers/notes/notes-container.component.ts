import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Board } from 'src/app/models/board.model';
import { BoardsStoreSelectors, BoardsStoreActions, RootStoreState } from 'src/app/root-store';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-note-container',
  templateUrl: './notes-container.component.html'
})
export class NotesContainerComponent {
  boards$: Observable<Board[]>;
  error$: Observable<any>;
  isLoading$: Observable<boolean>;

  constructor(private store$: Store<RootStoreState.RootState>) {}

  ngOnInit() {
    this.boards$ = this.store$.select(BoardsStoreSelectors.selectBoards);

    this.error$ = this.store$.select(BoardsStoreSelectors.selectError);

    this.isLoading$ = this.store$.select(BoardsStoreSelectors.selectIsLoading);

    this.store$.dispatch(BoardsStoreActions.loadBoardRequest());
  }

  public AddBoard()
  {    
    this.store$.dispatch(BoardsStoreActions.addNewBoard());
  }
}
