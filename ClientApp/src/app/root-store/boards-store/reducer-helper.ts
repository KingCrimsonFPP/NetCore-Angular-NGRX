import { BoardsState } from "./state";
import { Board } from "src/app/models/board.model";
import { Note } from "src/app/models/note.model";
import { IIdentificable } from "src/app/models/Interfaces/identificable.interface";
import { IEditable } from "src/app/models/Interfaces/editable.interface";
import { ILoadable } from "src/app/models/Interfaces/loadable.interface";

export class ReducerHelper {

    static excludeSaved<T extends IEditable & ILoadable>(models: T[]): T[] {
        var result = models.filter(model => !model.IsLoading || (!model.EditMode && !model.IsNew && !model.Error));
        return result;
    }

    //#region BOARDS
    static affectedBoard(boardId: number, state: BoardsState): Board {
        var result = this.findBoard(boardId, state);
        return result;
    }

    static notAffectedBoards(boardId: number, state: BoardsState): Board[] {
        var result = this.excludeById(boardId, state.Boards);
        return result;
    }

    static genericBoardEdit(editMode: boolean, state: BoardsState, boardId: number): BoardsState {
        var result = {
            ...state,
            IsLoading: false,
            Error: null,
            Boards:
                [
                    ...this.notAffectedBoards(boardId, state),
                    {
                        ...this.affectedBoard(boardId, state),
                        EditMode: editMode
                    }
                ],
        };
        return result;
    }

    static genericBoardChangeRequest(state: BoardsState, boardId: number, payload: Board): BoardsState {
        return this.genericBoardChangeHandler(true, true, state, boardId, payload);
    }
    
    static genericBoardChangeSuccess(state: BoardsState, boardId: number, payload: Board): BoardsState {
        return this.genericBoardChangeHandler(false, false, state, boardId, payload);
    }

    private static genericBoardChangeHandler(isLoading:boolean, changed:boolean ,state: BoardsState, boardId: number, payload: Board): BoardsState {
        var result = {
            ...state,
            IsLoading: isLoading,
            Error: null,
            Boards: [...this.excludeSaved(this.notAffectedBoards(boardId, state))],
        };
        if (payload) {
            result.Boards.push({
                ...payload,
                Error: null,
                IsLoading: isLoading,
                Changed: changed,
            });
        }
        return result;
    }

    static genericBoardChangeFailure(state: BoardsState, boardId: number, error: any): BoardsState {
        var result = {
            ...state,
            IsLoading: false,
            Error: error,
            Boards: [
                ...this.notAffectedBoards(boardId, state),
                {
                    ...this.affectedBoard(boardId, state),
                    Error: error,
                    IsLoading: false
                },
            ]
        };
        return result;
    }

    //#endregion BOARDS

    //#region NOTES
    static allNotes(boardId: number, state: BoardsState): Note[] {
        var board = this.findBoard(boardId, state);
        var result = board.Notes ? board.Notes : [];
        return result;
    }

    static affectedNote(noteId: number, boardId: number, state: BoardsState): Note {
        var board = this.findBoard(boardId, state);
        if (!board) return null;
        var result = this.findNote(noteId, board);
        return result;
    }

    static notAffectedNotes(noteId: number, boardId: number, state: BoardsState): Note[] {
        var board = this.findBoard(boardId, state);
        if (!board) return [];
        var result = this.excludeById(noteId, board.Notes);
        return result;
    }

    static genericNoteEdit(editMode: boolean, state: BoardsState, boardId: number, noteId: number): BoardsState {
        var result = {
            ...state,
            IsLoading: false,
            Error: null,
            Boards:
                [
                    ...this.notAffectedBoards(boardId, state),
                    {
                        ...this.affectedBoard(boardId, state),
                        Notes:
                            [
                                ...this.notAffectedNotes(noteId, boardId, state),
                                {
                                    ...this.affectedNote(noteId, boardId, state),
                                    EditMode: editMode
                                }
                            ]
                    }
                ],
        };
        return result;
    }

    static genericNoteChangeRequest(state: BoardsState, boardId: number, noteId: number, payload: Note): BoardsState {
        return this.genericNoteChangeHandler(true, true, state, boardId, noteId, payload);
    }

    static genericNoteChangeSuccess(state: BoardsState, boardId: number, noteId: number, payload: Note): BoardsState {
        return this.genericNoteChangeHandler(false, false, state, boardId, noteId, payload);
    }

    private static genericNoteChangeHandler(isLoading: boolean, changed: boolean, state: BoardsState, boardId: number, noteId: number, payload: Note) : BoardsState {
        var result = {
            ...state,
            IsLoading: isLoading,
            Error: null,
            Boards:
                [
                    ...this.notAffectedBoards(boardId, state),
                    {
                        ...this.affectedBoard(boardId, state),
                        Notes: [...this.excludeSaved(this.notAffectedNotes(noteId, boardId, state))]
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

    static genericNoteChangeFailure(state: BoardsState, boardId: number, noteId: number, error: any): BoardsState {
        var result = {
            ...state,
            IsLoading: false,
            Error: error,
            Boards: [
                ...this.notAffectedBoards(boardId, state),
                {
                    ...this.affectedBoard(boardId, state),
                    Notes: [
                        ...this.notAffectedNotes(noteId, boardId, state),
                        {
                            ...this.affectedNote(noteId, boardId, state),
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
    private static excludeById<T extends IIdentificable>(Id: number, array: T[]): T[] {
        var result = array.filter((item) => item.Id !== Id);
        return result;
    }

    private static findBoard(boardId: number, state: BoardsState): Board {
        return state.Boards.find((board) => board.Id === boardId);
    }

    private static findNote(noteId: number, board: Board): Note {
        var result = board.Notes.find((note) => note.Id === noteId);
        return result;
    }
    //#endregion PRIVATE
}