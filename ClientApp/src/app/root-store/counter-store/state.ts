
export interface CounterState {
  counter: number;
  isLoading?: boolean;
  error?: any;
}

export const initialState: CounterState = {
  counter: 0,
  isLoading: false,
  error: null,
};