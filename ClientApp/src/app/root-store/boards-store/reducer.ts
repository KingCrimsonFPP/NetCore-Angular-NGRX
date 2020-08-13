import { initialState, BoardsState } from "./state";
import { createReducer, on, Action } from "@ngrx/store";
import * as noteActions from "./actions";
import { RandomId } from "src/app/shared/random-id-generator";
import { Note } from "src/app/models/note.model";
import { Board } from "src/app/models/board.model";
// import { ReducerHelperNotes } from "./reducer-helper-notes";
import { ReducerHelper } from "../../shared/model-reducer-helper";
import { NestedReducerHelper } from "src/app/shared/nested-model-reducer-helper";

export const boardsFeatureKey = "boards";

export function boardsFeatureReducer(
  state: BoardsState | undefined,
  action: Action
) {
  return boardsReducer(state, action);
}

const boards: ReducerHelper<Board> = new ReducerHelper<Board>();
// const notes: ReducerHelperNotes = new ReducerHelperNotes();
const notes: NestedReducerHelper<Board, Note> = new NestedReducerHelper<Board, Note>();

const boardsReducer = createReducer(
  initialState,
  //#region  REDUCERS => BOARD ###############################################################################

  on(noteActions.loadBoardRequest, (state: BoardsState, action) => boards.LoadRequest(state)),
  on(noteActions.loadBoardFailure, (state: BoardsState, action) => boards.LoadFailure(state, action.error)),
  on(noteActions.loadBoardSuccess, (state: BoardsState, action) => boards.LoadSuccess(state, action.payload)),

  on(noteActions.addNewBoard, (state: BoardsState, action) => {
    var newBoard: Board =
    {
      Id: -RandomId.Generate(),
      IsNew: true,
      EditMode: true,
      Title: `New Board`,
      Date: new Date(),
      Items: [],
      IsLoading: false,
      Changed: false,
      Error: null
    };
    return boards.AddNew(state, newBoard);
  }),
  on(noteActions.removeNewBoard, (state: BoardsState, action) => boards.RemoveNew(state, action.boardId)),

  on(noteActions.editBoard, (state: BoardsState, action) => boards.Edit(state, action.boardId)),
  on(noteActions.cancelEditBoard, (state: BoardsState, action) => boards.EditCancellation(state, action.boardId)),

  on(noteActions.saveBoardRequest, (state: BoardsState, action) => boards.SaveRequest(state, action.payload.Id, action.payload)),
  on(noteActions.saveBoardFailure, (state: BoardsState, action) => boards.SaveFailure(state, action.boardId, action.error)),
  on(noteActions.saveBoardSuccess, (state: BoardsState, action) => boards.SaveSuccess(state, action.payload.Id, action.payload)),

  on(noteActions.deleteBoardRequest, (state: BoardsState, action) => boards.DeleteRequest(state, action.boardId)),
  on(noteActions.deleteBoardFailure, (state: BoardsState, action) => boards.DeleteFailure(state, action.boardId, action.error)),
  on(noteActions.deleteBoardSuccess, (state: BoardsState, action) => boards.DeleteSuccess(state, action.payload.Id)),

  //#endregion ###############################################################################################

  //#region  REDUCERS => NOTE ################################################################################

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
    return notes.AddNew(state, action.boardId, newNote);
  }),

  on(noteActions.removeNewNote, (state: BoardsState, action) => notes.RemoveNew(state, action.boardId, action.noteId)),

  on(noteActions.editNote, (state: BoardsState, action) => notes.Edit(state, action.boardId, action.noteId)),
  on(noteActions.cancelEditNote, (state: BoardsState, action) => notes.EditCancellation(state, action.boardId, action.noteId)),

  on(noteActions.saveNoteRequest, (state: BoardsState, action) => notes.SaveRequest(state, action.payload.BoardId, action.payload.Id, action.payload)),
  on(noteActions.saveNoteFailure, (state: BoardsState, action) => notes.SaveFailure(state, action.boardId, action.noteId, action.error)),
  on(noteActions.saveNoteSuccess, (state: BoardsState, action) => notes.SaveSuccess(state, action.payload.BoardId, action.payload.Id, action.payload)),

  on(noteActions.deleteNoteRequest, (state: BoardsState, action) => notes.DeleteRequest(state, action.boardId, action.noteId)),
  on(noteActions.deleteNoteFailure, (state: BoardsState, action) => notes.DeleteFailure(state, action.boardId, action.noteId, action.error)),
  on(noteActions.deleteNoteSuccess, (state: BoardsState, action) => notes.DeleteSuccess(state, action.payload.BoardId, action.payload.Id)),

  //#endregion ################################################################################################
);