import { Loadable } from "src/app/shared/interfaces/loadable.interface";

export interface CounterState extends Loadable {
  counter: number;
}

export const initialState: CounterState = {
  counter: 0,
  IsLoading: false,
  Error: null,
};