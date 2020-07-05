import { Board } from "src/app/models/board.model";

export interface BoardsState {
  boards: Board[];
  isLoading?: boolean;
  error?: any;
}

export const initialState: BoardsState = {
  isLoading: false,
  error: null,
  boards: [],
};