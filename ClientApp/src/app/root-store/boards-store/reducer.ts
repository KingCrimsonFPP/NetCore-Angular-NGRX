import { initialState, BoardsState } from "./state";
import { createReducer, on, Action } from "@ngrx/store";
import * as noteActions from "./actions";
import { RandomId } from "src/app/shared/random-id-generator";
import { Note } from "src/app/models/note.model";
import { Board } from "src/app/models/board.model";
import { ReducerHelperNotes } from "./reducer-helper-notes";
import { GenericReducer } from "../generic-reducer";

export const boardsFeatureKey = "boards";

export function boardsFeatureReducer(
  state: BoardsState | undefined,
  action: Action
) {
  return boardsReducer(state, action);
}

const boards : GenericReducer<Board> = new GenericReducer<Board>(); 
const notes: ReducerHelperNotes = new ReducerHelperNotes();

const boardsReducer = createReducer(
  initialState,
  //#region  REDUCERS => BOARD ###############################################################################

  //#region  LOAD BOARD 
  on(noteActions.loadBoardRequest, (state: BoardsState, action) => {
    var result = {
      ...state,
      IsLoading: true,
      Error: null,
    };
    return result;
  }),
  on(noteActions.loadBoardFailure, (state: BoardsState, action) => {
    var result = {
      ...state,
      IsLoading: false,
      Error: action.error,
    };
    return result;
  }),
  on(noteActions.loadBoardSuccess, (state: BoardsState, action) => {
    var result = {
      ...state,
      IsLoading: false,
      Error: null,
      Items: [...action.payload],
    };
    return result;
  }),
  //#endregion 

  //#region  ADD NEW BOARD 
  on(noteActions.addNewBoard, (state: BoardsState, action) => {
    var randomId = RandomId.Generate();
    var newBoard: Board =
    {
      Id: -randomId,
      IsNew: true,
      EditMode: true,
      Title: `New Board`,
      Date: new Date(),
      Notes: [],
      IsLoading: false,
      Changed: false,
      Error: null
    };
    var result = {
      ...state,
      IsLoading: false,
      Error: null,
      Items: [...state.Items, newBoard],
    };
    return result;
  }),
  //#endregion 

  //#region  REMOVE NEW BOARD 
  on(noteActions.removeNewBoard, (state: BoardsState, action) => {
    var result = {
      ...state,
      IsLoading: false,
      Error: null,
      Items: [...boards.notAffected(action.boardId, state)],
    };
    return result;
  }),
  //#endregion 

  //#region  EDIT BOARD 
  on(noteActions.editBoard,
    (state: BoardsState, action) => boards.genericEdit(true, state, action.boardId)),
  on(noteActions.cancelEditBoard,
    (state: BoardsState, action) => boards.genericEdit(false, state, action.boardId)),
  //#endregion 

  //#region  SAVE BOARD 
  // genericBoardChangeRequest
  on(noteActions.saveBoardRequest, (state: BoardsState, action) => boards.genericChangeRequest(state, action.payload.Id, action.payload)),
  on(noteActions.saveBoardFailure, (state: BoardsState, action) => boards.genericChangeFailure(state, action.boardId, action.error)),
  on(noteActions.saveBoardSuccess, (state: BoardsState, action) => boards.genericChangeSuccess(state, action.payload.Id, action.payload)),
  //#endregion 

  //#region  DELETE BOARD 
  on(noteActions.deleteBoardRequest, (state: BoardsState, action) => boards.genericChangeRequest(state, action.boardId, null)),
  on(noteActions.deleteBoardFailure, (state: BoardsState, action) => boards.genericChangeFailure(state, action.boardId, action.error)),
  on(noteActions.deleteBoardSuccess, (state: BoardsState, action) => boards.genericChangeSuccess(state, action.payload.Id, null)),
  //#endregion 

  //#endregion ###############################################################################################

  //#region  REDUCERS => NOTE ################################################################################

  // #region ADD NEW NOTE
  on(noteActions.addNewNote, (state: BoardsState, action) => {
    var randomId = RandomId.Generate();
    var boardId = action.boardId;
    var newNote: Note =
    {
      Id: -randomId,
      IsNew: true,
      EditMode: true,
      Title: null,
      Description: null,
      BoardId: boardId,
      Date: new Date(),
      IsLoading: false,
      Changed: false,
      Error: null,
    };
    var result = {
      ...state,
      IsLoading: false,
      Error: null,
      Items: [
        ...boards.notAffected(action.boardId, state),
        {
          ...boards.affected(action.boardId, state),
          Notes: [...notes.all(boardId, state), newNote],
        },
      ],
    };
    return result;
  }),
  //#endregion

  // #region REMOVE NEW NOTE
  on(noteActions.removeNewNote, (state: BoardsState, action) => {
    var result = {
      ...state,
      IsLoading: false,
      Error: null,
      Items: [
        ...boards.notAffected(action.boardId, state),
        {
          ...boards.affected(action.boardId, state),
          Notes: [...notes.notAffected(action.noteId, action.boardId, state)],
        },
      ],
    };
    return result;
  }),
  //#endregion

  //#region  EDIT NOTE 
  on(noteActions.editNote,
    (state: BoardsState, action) => notes.genericEdit(true, state, action.boardId, action.noteId)),
  on(noteActions.cancelEditNote,
    (state: BoardsState, action) => notes.genericEdit(false, state, action.boardId, action.noteId)),
  //#endregion 

  //#region  SAVE NOTE 
  on(noteActions.saveNoteRequest, (state: BoardsState, action) => notes.genericChangeRequest(state, action.payload.BoardId, action.payload.Id, action.payload)),
  on(noteActions.saveNoteFailure, (state: BoardsState, action) => notes.genericChangeFailure(state, action.boardId, action.noteId, action.error)),
  on(noteActions.saveNoteSuccess, (state: BoardsState, action) => notes.genericChangeSuccess(state, action.payload.BoardId, action.payload.Id, action.payload)),
  //#endregion 

  //#region  DELETE NOTE 
  on(noteActions.deleteNoteRequest, (state: BoardsState, action) => notes.genericChangeRequest(state, action.boardId, action.noteId, null)),
  on(noteActions.deleteNoteFailure, (state: BoardsState, action) => notes.genericChangeFailure(state, action.boardId, action.noteId, action.error)),
  on(noteActions.deleteNoteSuccess, (state: BoardsState, action) => notes.genericChangeSuccess(state, action.payload.BoardId, action.payload.Id, null)),
  //#endregion 

  //#endregion ################################################################################################
);