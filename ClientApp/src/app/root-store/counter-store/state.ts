import { ILoadable } from "src/app/models/Interfaces/loadable.interface";

export interface CounterState extends ILoadable {
  counter: number;
}

export const initialState: CounterState = {
  counter: 0,
  IsLoading: false,
  Error: null,
};