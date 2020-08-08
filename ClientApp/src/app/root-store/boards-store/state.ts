import { Board } from "src/app/models/board.model";
import { GenericState } from "src/app/shared/interfaces/generic-state.interface";

export interface BoardsState extends GenericState<Board> {
}

export const initialState: BoardsState = {
  IsLoading: false,
  Error: null,
  Items: [],
};