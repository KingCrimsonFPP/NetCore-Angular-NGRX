import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, Observable } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as boardActions from './actions';
import { Action } from '@ngrx/store';
import { BoardService } from 'src/app/services/board.service';
import { NoteService } from 'src/app/services/note.service';
import { Board } from 'src/app/models/board.model';
import { Note } from 'src/app/models/note.model';

@Injectable()
export class BoardsEffects {
    constructor(
        private actions$: Actions,
        private boardService: BoardService,
        private noteService: NoteService,
    ) { }

    // #region EFFECTS => BOARD #################################################################################

    /* #region LOAD BOARD */
    loadRequest$: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(boardActions.loadBoardRequest),
            switchMap(() =>
                this.boardService.GetAll().pipe(
                    map(boards => boardActions.loadBoardSuccess({ payload: boards })),
                    catchError(error => of(boardActions.loadBoardFailure({ error })))
                ),
            ),
        )
    );
    /* #endregion */

    /* #region SAVE BOARD */
    saveRequest$: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(boardActions.saveBoardRequest),
            switchMap((action) => {
                var result$: Observable<Board>;
                if (action.payload.IsNew) {
                    result$ = this.boardService.Add(action.payload);
                }
                else {
                    result$ = this.boardService.Patch(action.payload);
                }
                return result$.pipe(
                    map(board => boardActions.saveBoardSuccess({ payload: board })),
                    catchError(error => of(boardActions.saveBoardFailure(
                        { 
                            boardId: action.payload.Id,
                            error: error 
                        })))
                );
            },
            ),
        )
    );
    /* #endregion */

    /* #region DELETE BOARD */
    deleteRequest$: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(boardActions.deleteBoardRequest),
            switchMap((action) =>
                this.boardService.Delete(action.boardId).pipe(
                    map(board => boardActions.deleteBoardSuccess({ payload: board })),
                    catchError(error => of(boardActions.deleteBoardFailure(
                        { 
                            boardId: action.boardId,
                            error: error 
                        })))
                ),
            ),
        )
    );
    /* #endregion */

    //#endregion ################################################################################################


    // #region EFFECTS => NOTE ##################################################################################

    /* #region SAVE NOTE */
    saveNoteRequest$: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(boardActions.saveNoteRequest),
            switchMap((action) => {
                var result$: Observable<Note>;
                if (action.payload.IsNew) {
                    result$ = this.noteService.Add(action.boardId, action.payload);
                }
                else {
                    result$ = this.noteService.Patch(action.boardId, action.payload);
                }
                return result$.pipe(
                    map(note => boardActions.saveNoteSuccess({ payload: note })),
                    catchError(error => of(boardActions.saveNoteFailure({ 
                        boardId: action.boardId,
                        noteId: action.payload.Id ,
                        error: error 
                    })))
                );
            },
            ),
        )
    );
    /* #endregion */

    /* #region DELETE NOTE */
    deleteNoteRequest$: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(boardActions.deleteNoteRequest),
            switchMap((action) =>
                this.noteService.Delete(action.boardId, action.noteId).pipe(
                    map(note => boardActions.deleteNoteSuccess({ payload: note })),
                    catchError(error => of(boardActions.deleteNoteFailure({ 
                        boardId: action.boardId,
                        noteId: action.noteId,
                        error: error 
                    })))
                ),
            ),
        )
    );
    /* #endregion */

    //#endregion ################################################################################################
}