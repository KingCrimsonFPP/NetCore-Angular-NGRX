import { BoardsState } from "./state";
import { Board } from "src/app/models/board.model";
import { Note } from "src/app/models/note.model";
import { Identificable } from "src/app/shared/interfaces/identificable.interface";
import { Editable } from "src/app/shared/interfaces/editable.interface";
import { Loadable } from "src/app/shared/interfaces/loadable.interface";
import { GenericReducer } from "../generic-reducer";

export class ReducerHelperNotes {

    models : GenericReducer<Board> = new GenericReducer<Board>(); 

    //#region NOTES
    all(boardId: number, state: BoardsState): Note[] {
        var model = this.models.find(boardId, state);
        var result = model.Notes ? model.Notes : [];
        return result;
    }

    affected(noteId: number, boardId: number, state: BoardsState): Note {
        var board = this.models.find(boardId, state);
        if (!board) return null;
        var result = this.find(noteId, board);
        return result;
    }

    notAffected(noteId: number, boardId: number, state: BoardsState): Note[] {
        var board = this.models.find(boardId, state);
        if (!board) return [];
        var result = this.excludeById(noteId, board.Notes);
        return result;
    }

    genericEdit(editMode: boolean, state: BoardsState, boardId: number, noteId: number): BoardsState {
        var result = {
            ...state,
            IsLoading: false,
            Error: null,
            Boards:
                [
                    ...this.models.notAffected(boardId, state),
                    {
                        ...this.models.affected(boardId, state),
                        Notes:
                            [
                                ...this.notAffected(noteId, boardId, state),
                                {
                                    ...this.affected(noteId, boardId, state),
                                    EditMode: editMode
                                }
                            ]
                    }
                ],
        };
        return result;
    }

    genericChangeRequest(state: BoardsState, boardId: number, noteId: number, payload: Note): BoardsState {
        return this.genericChangeHandler(true, true, state, boardId, noteId, payload);
    }

    genericChangeSuccess(state: BoardsState, boardId: number, noteId: number, payload: Note): BoardsState {
        return this.genericChangeHandler(false, false, state, boardId, noteId, payload);
    }

    private genericChangeHandler(isLoading: boolean, changed: boolean, state: BoardsState, boardId: number, noteId: number, payload: Note) : BoardsState {
        var result = {
            ...state,
            IsLoading: isLoading,
            Error: null,
            Boards:
                [
                    ...this.models.notAffected(boardId, state),
                    {
                        ...this.models.affected(boardId, state),
                        Notes: [...this.excludeSaved(this.notAffected(noteId, boardId, state))]
                    }
                ],
        };
        if (payload) {
            result.Boards.find(x => x.Id === boardId).Notes.push({
                ...payload,
                Error: null,
                IsLoading: isLoading,
                Changed: changed,
            });
        }
        return result;
    }

    genericChangeFailure(state: BoardsState, boardId: number, noteId: number, error: any): BoardsState {
        var result = {
            ...state,
            IsLoading: false,
            Error: error,
            Boards: [
                ...this.models.notAffected(boardId, state),
                {
                    ...this.models.affected(boardId, state),
                    Notes: [
                        ...this.notAffected(noteId, boardId, state),
                        {
                            ...this.affected(noteId, boardId, state),
                            Error: error,
                            IsLoading: false
                        }
                    ],
                },
            ]
        };
        return result;
    }

    //#endregion NOTES

    //#region PRIVATE
    private excludeById<T extends Identificable>(Id: number, array: T[]): T[] {
        var result = array.filter((item) => item.Id !== Id);
        return result;
    }

    excludeSaved<T extends Editable & Loadable>(models: T[]): T[] {
        var result = models.filter(model => !model.IsLoading || (!model.EditMode && !model.IsNew && !model.Error));
        return result;
    }

    private find(noteId: number, board: Board): Note {
        var result = board.Notes.find((note) => note.Id === noteId);
        return result;
    }
    //#endregion PRIVATE
}