import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, Observable } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as boardActions from './actions';
import { Action } from '@ngrx/store';
import { BoardService } from 'src/app/services/board.service';
import { NoteService } from 'src/app/services/note.service';

@Injectable()
export class BoardsEffects {
    constructor(
        private actions$: Actions,
        private boardService: BoardService,
        private noteService: NoteService,
    ) { }

    /* #region EFFECTS => BOARD */
    /* #region LOAD BOARD */
    loadRequest$: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(boardActions.loadRequest),
            switchMap(() =>
                this.boardService.GetAll().pipe(
                    map(boards => boardActions.loadSuccess({ payload: boards })),
                    catchError(error => of(boardActions.loadFailure({ error })))
                ),
            ),
        )
    );
    /* #endregion */

    /* #region SAVE BOARD */
    saveRequest$: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(boardActions.saveBoardRequest),
            switchMap((action) =>
                this.boardService.Add(action.payload).pipe(
                    map(board => boardActions.saveBoardSuccess({ payload: board })),
                    catchError(error => of(boardActions.loadFailure({ error })))
                ),
            ),
        )
    );
    /* #endregion */

    /* #region DELETE BOARD */
    deleteRequest$: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(boardActions.deleteBoardRequest),
            switchMap((action) =>
                this.boardService.Delete(action.id).pipe(
                    map(board => boardActions.deleteBoardSuccess({ payload: board })),
                    catchError(error => of(boardActions.loadFailure({ error })))
                ),
            ),
        )
    );
    /* #endregion */

    /* #endregion */

    
    /* #region EFFECTS => NOTE */

    /* #region ADD NOTE */
    saveNoteRequest$: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(boardActions.saveNoteRequest),
            switchMap((action) =>
                this.noteService.Add(action.boardId,action.payload).pipe(
                    map(note => boardActions.saveNoteSuccess({ payload: note })),
                    catchError(error => of(boardActions.saveNoteFailure({ error })))
                ),
            ),
        )
    );
    /* #endregion */

    /* #region DELETE NOTE */
    deleteNoteRequest$: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(boardActions.deleteNoteRequest),
            switchMap((action) =>
                this.noteService.Delete(action.boardId,action.noteId).pipe(
                    map(note => boardActions.deleteNoteSuccess({ payload: note })),
                    catchError(error => of(boardActions.deleteNoteFailure({ error })))
                ),
            ),
        )
    );
    /* #endregion */

    /* #endregion */

}