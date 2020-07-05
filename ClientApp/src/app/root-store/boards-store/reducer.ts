import { initialState, BoardsState } from "./state";
import { createReducer, on, Action } from "@ngrx/store";
import * as noteActions from "./actions";
import { RandomId } from "src/app/common/random-id-generator";
import { Note } from "src/app/models/note.model";
import { Board } from "src/app/models/board.model";

export const boardsFeatureKey = "boards";

export function boardsFeatureReducer(
  state: BoardsState | undefined,
  action: Action
) {
  return boardsReducer(state, action);
}

// REDUCER
const boardsReducer = createReducer(
  initialState,
  //#region  REDUCERS => BOARD ################################################################################

  //#region  LOAD BOARD 
  on(noteActions.loadRequest, genericRequestReducer),
  on(noteActions.loadFailure, genericFailureReducer),
  on(noteActions.loadSuccess, (state, action) => ({
    ...state,
    boards: [...action.payload],
    isLoading: false,
    errorMessage: null,
  })),
  //#endregion 

  //#region  ADD BOARD 
  on(noteActions.addNewBoard, (state, action) => {

    var randomId = RandomId.Generate();
    var newBoard: Board =
    {
      Id: -randomId,
      NewId: -randomId,
      New: true,
      EditMode: true,
      Title: `New Board #${randomId}`,
      Date: new Date(),
      Notes: []
    };

    return {
      ...state,
      boards: [...state.boards, newBoard],
      isLoading: false,
      errorMessage: null,
    };
  }),
  //#endregion 

  //#region  SAVE BOARD 
  on(noteActions.saveBoardRequest, genericRequestReducer),
  on(noteActions.saveBoardFailure, genericFailureReducer),
  on(noteActions.saveBoardSuccess, (state, action) => {
    return {
      ...state,
      boards: [...allButAffectedBoards(state, action.payload.Id), action.payload],
      isLoading: false,
      errorMessage: null,
    };
  }),
  //#endregion 

  //#region  DELETE BOARD 
  on(noteActions.deleteBoardRequest, genericRequestReducer),
  on(noteActions.deleteBoardFailure, genericFailureReducer),
  on(noteActions.deleteBoardSuccess, (state, action) => ({
    ...state,
    boards: state.boards.filter((item, index) => index !== action.payload.Id),
    isLoading: false,
    errorMessage: null,
  })),
  //#endregion 

  //#endregion

  //#region  REDUCERS => NOTE ################################################################################

  // #region ADD NEW NOTE
  on(noteActions.addNewNote, (state, action) => {
    var randomId = RandomId.Generate();
    var newNote: Note =
    {
      Id: -randomId,
      NewId: -randomId,
      New: true,
      EditMode: true,
      Title: null,
      Description: null,
      BoardId: action.boardId,
      Date: new Date(),
    };

    return {
      ...state,
      boards: [
        ...allButAffectedBoards(state, action.boardId),
        {
          ...affectedBoard(state, action.boardId),
          Notes: [...affectedBoardNotesList(state, action.boardId), newNote],
        },
      ],
      isLoading: false,
      errorMessage: null,
    };
  }),
  //#endregion

  // #region REMOVE NEW NOTE
  on(noteActions.removeNewNote, (state, action) => {


    return {
      ...state,
      boards: [
        ...allButAffectedBoards(state, action.boardId),
        {
          ...affectedBoard(state, action.boardId),
          Notes: allButAffectedNotes(state, action.boardId, action.noteId),
        },
      ],
      isLoading: false,
      errorMessage: null,
    };
  }),
  //#endregion

  //#region  SAVE NOTE 
  on(noteActions.saveNoteRequest, genericRequestReducer),
  on(noteActions.saveNoteFailure, genericFailureReducer),
  on(noteActions.saveNoteSuccess, (state, action) => {
    return {
      ...state,
      boards: [
        ...allButAffectedBoards(state, action.payload.BoardId),
        {
          ...affectedBoard(state, action.payload.BoardId),
          Notes: [...allButAffectedNotes(state, action.payload.BoardId, action.payload.Id), action.payload],
        },
      ],
      isLoading: false,
      errorMessage: null,
    };
  }),
  //#endregion 

  //#region  DELETE NOTE 
  on(noteActions.deleteNoteRequest, genericRequestReducer),
  on(noteActions.deleteNoteFailure, genericFailureReducer),
  on(noteActions.deleteNoteSuccess, (state, action) => {
    return {
      ...state,
      boards: [
        ...allButAffectedBoards(state, action.payload.BoardId),
        {
          ...affectedBoard(state, action.payload.BoardId),
          Notes: [...affectedBoardNotesList(state, action.payload.Id)],
        },
      ],
      isLoading: false,
      errorMessage: null,
    };
  })
  //#endregion 

  //#endregion 
);

//#region HELPERS FUNCTIONS
function genericRequestReducer(state: BoardsState): BoardsState {
  return {
    ...state,
    isLoading: true,
    error: null,
  };
}

function genericFailureReducer(state: BoardsState, action): BoardsState {
  return {
    ...state,
    isLoading: false,
    error: action.error,
  };
}

function allButAffectedBoards(state: BoardsState, boardId: number): Board[] {
  return state.boards.filter((board) => board.Id !== boardId);
}

function affectedBoard(state: BoardsState, boardId: number): Board {
  return state.boards.find((board) => board.Id === boardId);
}

function affectedBoardNotesList(state: BoardsState, boardId: number): Note[] {
  var board = affectedBoard(state, boardId);
  return board.Notes ? board.Notes : [];
}

function allButAffectedNotes(state: BoardsState, boardId: number, noteId: number): Note[] {
  var board = affectedBoard(state, boardId);
  var notes = board.Notes ? board.Notes : [];
  return notes.filter((note) => note.Id !== noteId);
}
//#endregion