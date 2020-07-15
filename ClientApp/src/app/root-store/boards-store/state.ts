import { Board } from "src/app/models/board.model";
import { ILoadable } from "src/app/models/Interfaces/loadable.interface";

export interface BoardsState extends ILoadable {
  Boards: Board[];
}

export const initialState: BoardsState = {
  IsLoading: false,
  Error: null,
  Boards: [],
};