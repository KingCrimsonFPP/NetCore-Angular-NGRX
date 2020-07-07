import { createAction, props } from "@ngrx/store";
import { Board } from "src/app/models/board.model";
import { Note } from "src/app/models/note.model";

/* #region LOAD BOARD */
export const loadRequest = createAction("[Board] Load Request");

export const loadFailure = createAction(
  "[Board] Load Failure",
  props<{ error: string }>()
);

export const loadSuccess = createAction(
  "[Board] Load Success",
  props<{ payload: Board[] }>()
);
/* #endregion */

/* #region ADD BOARD */
export const addNewBoard = createAction(
  "[Board] Add New"
);
/* #endregion */

/* #region EDIT BOARD */
export const editBoard = createAction(
  "[Board] Edit",
  props<{ id: number }>()
);
/* #endregion */

/* #region EDIT BOARD */
export const cancelEditBoard = createAction(
  "[Board] Cancel Edit",
  props<{ id: number }>()
);
/* #endregion */

/* #region SAVE BOARD */
export const saveBoardRequest = createAction(
  "[Board] Save",
  props<{ payload: Board }>()
);

export const saveBoardFailure = createAction(
  "[Board] Save Failure",
  props<{ error: string }>()
);

export const saveBoardSuccess = createAction(
  "[Board] SaveSuccess",
  props<{ payload: Board }>()
);
/* #endregion */

/* #region REMOVE NEW BOARD */
export const removeNewBoard = createAction(
  "[Board] Remove",
  props<{ id: number }>()
);
/* #endregion */

/* #region DELETE BOARD */
export const deleteBoardRequest = createAction(
  "[Board] Delete",
  props<{ id: number }>()
);

export const deleteBoardFailure = createAction(
  "[Board] Delete Failure",
  props<{ error: string }>()
);

export const deleteBoardSuccess = createAction(
  "[Board] Delete Success",
  props<{ payload: Board }>()
);
/* #endregion */

/* #region ADD NEW NOTE */
export const addNewNote = createAction(
  "[Note] Add",
  props<{ boardId: number }>()
);
/* #endregion */

/* #region EDIT NOTE */
export const editNote = createAction(
  "[Note] Edit",
  props<{ boardId: number, noteId: number }>()
);
/* #endregion */

/* #region EDIT NOTE */
export const cancelEditNote = createAction(
  "[Note] Cancel Edit",
  props<{ boardId: number, noteId: number }>()
);
/* #endregion */

/* #region SAVE NOTE */
export const saveNoteRequest = createAction(
  "[Note] Save",
  props<{ boardId: number; payload: Note }>()
);

export const saveNoteFailure = createAction(
  "[Note] Save Failure",
  props<{ error: string }>()
);

export const saveNoteSuccess = createAction(
  "[Note] Save Success",
  props<{ payload: Note }>()
);
/* #endregion */

/* #region REMOVE NEW NOTE*/
export const removeNewNote = createAction(
  "[Note] Remove",
  props<{ boardId: number, noteId: number }>()
);
/* #endregion */

/* #region DELETE NOTE */
export const deleteNoteRequest = createAction(
  "[Note] Delete",
  props<{ boardId: number, noteId: number }>()
);

export const deleteNoteFailure = createAction(
  "[Note] Delete Failure",
  props<{ error: string }>()
);

export const deleteNoteSuccess = createAction(
  "[Note] Delete Success",
  props<{ payload: Note }>()
);
/* #endregion */