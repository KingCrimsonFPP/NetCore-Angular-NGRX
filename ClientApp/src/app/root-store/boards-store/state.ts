import { Board } from "src/app/models/board.model";
import { CollectionState } from "src/app/shared/interfaces/generic-state.interface";

export interface BoardsState extends CollectionState<Board> {
}

export const initialState: BoardsState = {
  IsLoading: false,
  Error: null,
  Items: [],
};