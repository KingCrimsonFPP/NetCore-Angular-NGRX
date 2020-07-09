import { initialState, BoardsState } from "./state";
import { createReducer, on, Action } from "@ngrx/store";
import * as noteActions from "./actions";
import { RandomId } from "src/app/common/random-id-generator";
import { Note } from "src/app/models/note.model";
import { Board } from "src/app/models/board.model";
import { IEditable } from "src/app/models/ieditable.interface";

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
  on(noteActions.loadRequest, (state: BoardsState) => {
    var result = {
      ...state,
      isLoading: true,
      error: null,
    };
    return result;
  }),
  on(noteActions.loadFailure, (state: BoardsState, payload) => {
    var result = {
      ...state,
      isLoading: false,
      error: payload.error,
    };
    return result;
  }),
  on(noteActions.loadSuccess, (state, action) => {
    var result = {
      ...state,
      boards: [...action.payload],
      isLoading: false,
      errorMessage: null,
    };
    return result;
  }),
  //#endregion 

  //#region  ADD NEW BOARD 
  on(noteActions.addNewBoard, (state, action) => {

    var randomId = RandomId.Generate();
    var newBoard: Board =
    {
      Id: -randomId,
      IsNew: true,
      EditMode: true,
      Title: `New Board`,
      Date: new Date(),
      Notes: [],
      IsSaving: false
    };

    var result = {
      ...state,
      boards: [...state.boards, newBoard],
      isLoading: false,
      errorMessage: null,
    };

    return result;
  }),
  //#endregion 

  //#region  REMOVE NEW BOARD 
  on(noteActions.removeNewBoard, (state, action) => {
    var result = {
      ...state,
      boards: [...allButAffectedBoards(state, action.id)],
      isLoading: false,
      errorMessage: null,
    };
    return result;
  }),
  //#endregion 

  //#region  EDIT BOARD 
  on(noteActions.editBoard, (state, action) => {
    var result = {
      ...state,
      boards:
        [
          ...allButAffectedBoards(state, action.id),
          {
            ...affectedBoard(state, action.id),
            EditMode: true
          }
        ],
      isLoading: false,
      errorMessage: null,
    };

    return result;
  }),
  //#endregion 

  //#region  CANCEL EDIT BOARD 
  on(noteActions.cancelEditBoard, (state, action) => {
    var result = {
      ...state,
      boards:
        [
          ...allButAffectedBoards(state, action.id),
          {
            ...affectedBoard(state, action.id),
            EditMode: false
          }
        ],
      isLoading: false,
      errorMessage: null,
    };

    return result;
  }),
  //#endregion 

  //#region  SAVE BOARD 
  on(noteActions.saveBoardRequest, (state: BoardsState, action) => {
    var result = {
      ...state,
      boards:
        [
          ...allButAffectedBoards(state, action.payload.Id),
          {
            ...action.payload,
            IsSaving: true
          }
        ],
      isLoading: true,
      error: null,
    };
    return result;
  }),
  on(noteActions.saveBoardFailure, (state: BoardsState, payload) => {
    var result = {
      ...state,
      isLoading: false,
      error: payload.error,
    };
    return result;
  }),
  on(noteActions.saveBoardSuccess, (state, action) => {
    var result = {
      ...state,
      boards: [... excludePersisted(allButAffectedBoards(state, action.payload.Id)), action.payload],
      isLoading: false,
      errorMessage: null,
    };
    return result;
  }),
  //#endregion 

  //#region  DELETE BOARD 
  on(noteActions.deleteBoardRequest, (state: BoardsState) => {
    var result = {
      ...state,
      isLoading: true,
      error: null,
    };
    return result;
  }),
  on(noteActions.deleteBoardFailure, (state: BoardsState, payload) => {
    var result = {
      ...state,
      isLoading: false,
      error: payload.error,
    };
    return result;
  }),
  on(noteActions.deleteBoardSuccess, (state, action) => {
    var result = {
      ...state,
      boards: allButAffectedBoards(state, action.payload.Id),
      isLoading: false,
      errorMessage: null,
    };
    return result;
  }),
  //#endregion 

  //#endregion ###############################################################################################

  //#region  REDUCERS => NOTE ################################################################################

  // #region ADD NEW NOTE
  on(noteActions.addNewNote, (state, action) => {
    var randomId = RandomId.Generate();
    var newNote: Note =
    {
      Id: -randomId,
      IsNew: true,
      EditMode: true,
      Title: null,
      Description: null,
      BoardId: action.boardId,
      Date: new Date(),
      IsSaving: false
    };

    var result = {
      ...state,
      boards: [
        ...allButAffectedBoards(state, action.boardId),
        {
          ...affectedBoard(state, action.boardId),
          Notes: [...allNotesFromAffectedBoard(state, action.boardId), newNote],
        },
      ],
      isLoading: false,
      errorMessage: null,
    };
    return result;
  }),
  //#endregion

  // #region REMOVE NEW NOTE
  on(noteActions.removeNewNote, (state, action) => {
    var result = {
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
    return result;
  }),
  //#endregion

  //#region  EDIT NOTE 
  on(noteActions.editNote, (state, action) => {
    var result = {
      ...state,
      boards:
        [
          ...allButAffectedBoards(state, action.boardId),
          {
            ...affectedBoard(state, action.boardId),
            Notes:
              [
                ...allButAffectedNotes(state, action.boardId, action.noteId),
                {
                  ...affectedNote(state, action.boardId, action.noteId),
                  EditMode: true
                }
              ]
          }
        ],
      isLoading: false,
      errorMessage: null,
    };

    return result;
  }),
  //#endregion 

  //#region CANCEL EDIT NOTE 
  on(noteActions.cancelEditNote, (state, action) => {
    var result = {
      ...state,
      boards:
        [
          ...allButAffectedBoards(state, action.boardId),
          {
            ...affectedBoard(state, action.boardId),
            Notes:
              [
                ...allButAffectedNotes(state, action.boardId, action.noteId),
                {
                  ...affectedNote(state, action.boardId, action.noteId),
                  EditMode: false
                }
              ]
          }
        ],
      isLoading: false,
      errorMessage: null,
    };

    return result;
  }),
  //#endregion 

  //#region  SAVE NOTE 
  on(noteActions.saveNoteRequest, (state: BoardsState, action) => {
    var result = {
      ...state,
      boards:
        [
          ...allButAffectedBoards(state, action.payload.BoardId),
          {
            ...affectedBoard(state, action.payload.BoardId),
            Notes:
              [
                ...allButAffectedNotes(state, action.payload.BoardId, action.payload.Id),
                {
                  ...action.payload,
                  IsSaving: true
                }
              ]
          }
        ],
      isLoading: true,
      error: null,
    };
    return result;
  }),
  on(noteActions.saveNoteFailure, (state: BoardsState, payload) => {
    var result = {
      ...state,
      isLoading: false,
      error: payload.error,
    };
    return result;
  }),
  on(noteActions.saveNoteSuccess, (state, action) => {
    var result = {
      ...state,
      boards: [
        ...allButAffectedBoards(state, action.payload.BoardId),
        {
          ...affectedBoard(state, action.payload.BoardId),
          Notes: [...excludePersisted(allButAffectedNotes(state, action.payload.BoardId, action.payload.Id)), action.payload],
        },
      ],
      isLoading: false,
      errorMessage: null,
    };
    return result;
  }),
  //#endregion 

  //#region  DELETE NOTE 
  on(noteActions.deleteNoteRequest, (state: BoardsState) => {
    var result = {
      ...state,
      isLoading: true,
      error: null,
    };
    return result;
  }),
  on(noteActions.deleteNoteFailure, (state: BoardsState, action) => {
    var result = {
      ...state,
      isLoading: false,
      error: action.error,
    };
    return result;
  }),
  on(noteActions.deleteNoteSuccess, (state, action) => {
    var result = {
      ...state,
      boards: [
        ...allButAffectedBoards(state, action.payload.BoardId),
        {
          ...affectedBoard(state, action.payload.BoardId),
          Notes: [...allButAffectedNoteFromAffectedBoard(state, action.payload.BoardId, action.payload.Id)],
        },
      ],
      isLoading: false,
      errorMessage: null,
    };
    return result;
  })
  //#endregion 

  //#endregion ################################################################################################
);

/* #region  PRIVATE HELPER FUNCTIONS */

function allButAffectedBoards(state: BoardsState, boardId: number): Board[] {
  var result = state.boards.filter((board) => board.Id !== boardId);
  return result;
}

function affectedBoard(state: BoardsState, boardId: number): Board {
  return state.boards.find((board) => board.Id === boardId);
}

function allNotesFromAffectedBoard(state: BoardsState, boardId: number): Note[] {
  var board = affectedBoard(state, boardId);
  var result = board.Notes ? board.Notes : [];
  return result;
}

function allButAffectedNoteFromAffectedBoard(state: BoardsState, boardId: number, noteId: number): Note[] {
  return allNotesFromAffectedBoard(state, boardId).filter(note => note.Id !== noteId);
}

function allButAffectedNotes(state: BoardsState, boardId: number, noteId: number): Note[] {
  var board = affectedBoard(state, boardId);
  var notes = board.Notes ? board.Notes : [];
  return notes.filter((note) => note.Id !== noteId);
}

function affectedNote(state: BoardsState, boardId: number, noteId: number): Note {
  return allNotesFromAffectedBoard(state, boardId).find((note) => note.Id === noteId);
}

function excludePersisted<T extends IEditable>(models: T[])  {
  return models.filter(model => !(model.IsSaving && (model.EditMode || model.IsNew)));
}
/* #endregion */