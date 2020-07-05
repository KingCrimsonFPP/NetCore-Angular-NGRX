import { BoardsState as noteState } from './boards-store/state';
import { CounterState as counterState } from './counter-store/state';

export interface RootState {
    notes: noteState,
    couters: counterState
}
