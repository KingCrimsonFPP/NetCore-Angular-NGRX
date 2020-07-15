import { initialState, BoardsState } from "./state";
import { createReducer, on, Action } from "@ngrx/store";
import * as noteActions from "./actions";
import { RandomId } from "src/app/common/random-id-generator";
import { Note } from "src/app/models/note.model";
import { Board } from "src/app/models/board.model";
import { ReducerHelper as h } from "./reducer-helper";

export const boardsFeatureKey = "boards";

export function boardsFeatureReducer(
  state: BoardsState | undefined,
  action: Action
) {
  return boardsReducer(state, action);
}

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
      Boards: [...action.payload],
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
      Boards: [...state.Boards, newBoard],
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
      Boards: [...h.notAffectedBoards(action.boardId, state)],
    };
    return result;
  }),
  //#endregion 

  //#region  EDIT BOARD 
  on(noteActions.editBoard,
    (state: BoardsState, action) => h.genericBoardEdit(true, state, action.boardId)),
  on(noteActions.cancelEditBoard,
    (state: BoardsState, action) => h.genericBoardEdit(false, state, action.boardId)),
  //#endregion 

  //#region  SAVE BOARD 
  // genericBoardChangeRequest
  on(noteActions.saveBoardRequest, (state: BoardsState, action) => h.genericBoardChangeRequest(state, action.payload.Id, action.payload)),
  on(noteActions.saveBoardFailure, (state: BoardsState, action) => h.genericBoardChangeFailure(state, action.boardId, action.error)),
  on(noteActions.saveBoardSuccess, (state: BoardsState, action) => h.genericBoardChangeSuccess(state, action.payload.Id, action.payload)),
  //#endregion 

  //#region  DELETE BOARD 
  on(noteActions.deleteBoardRequest, (state: BoardsState, action) => h.genericBoardChangeRequest(state, action.boardId, null)),
  on(noteActions.deleteBoardFailure, (state: BoardsState, action) => h.genericBoardChangeFailure(state, action.boardId, action.error)),
  on(noteActions.deleteBoardSuccess, (state: BoardsState, action) => h.genericBoardChangeSuccess(state, action.payload.Id, null)),
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
      Boards: [
        ...h.notAffectedBoards(action.boardId, state),
        {
          ...h.affectedBoard(action.boardId, state),
          Notes: [...h.allNotes(boardId, state), newNote],
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
      Boards: [
        ...h.notAffectedBoards(action.boardId, state),
        {
          ...h.affectedBoard(action.boardId, state),
          Notes: [...h.notAffectedNotes(action.noteId, action.boardId, state)],
        },
      ],
    };
    return result;
  }),
  //#endregion

  //#region  EDIT NOTE 
  on(noteActions.editNote,
    (state: BoardsState, action) => h.genericNoteEdit(true, state, action.boardId, action.noteId)),
  on(noteActions.cancelEditNote,
    (state: BoardsState, action) => h.genericNoteEdit(false, state, action.boardId, action.noteId)),
  //#endregion 

  //#region  SAVE NOTE 
  on(noteActions.saveNoteRequest, (state: BoardsState, action) => h.genericNoteChangeRequest(state, action.payload.BoardId, action.payload.Id, action.payload)),
  on(noteActions.saveNoteFailure, (state: BoardsState, action) => h.genericNoteChangeFailure(state, action.boardId, action.noteId, action.error)),
  on(noteActions.saveNoteSuccess, (state: BoardsState, action) => h.genericNoteChangeSuccess(state, action.payload.BoardId, action.payload.Id, action.payload)),
  //#endregion 

  //#region  DELETE NOTE 
  on(noteActions.deleteNoteRequest, (state: BoardsState, action) => h.genericNoteChangeRequest(state, action.boardId, action.noteId, null)),
  on(noteActions.deleteNoteFailure, (state: BoardsState, action) => h.genericNoteChangeFailure(state, action.boardId, action.noteId, action.error)),
  on(noteActions.deleteNoteSuccess, (state: BoardsState, action) => h.genericNoteChangeSuccess(state, action.payload.BoardId, action.payload.Id, null)),
  //#endregion 

  //#endregion ################################################################################################
);