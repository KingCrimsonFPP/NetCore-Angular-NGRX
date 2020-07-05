import { createSelector, MemoizedSelector } from '@ngrx/store';
import { BoardsStoreSelectors } from './boards-store';
import { CounterStoreSelectors } from './counter-store';

export const selectError: MemoizedSelector<object, string> = createSelector(
    BoardsStoreSelectors.selectError,
    CounterStoreSelectors.selectError,
  (notesError: string, counterError: string) => {
    return notesError || counterError;
  }
);

export const selectIsLoading: MemoizedSelector<
  object,
  boolean
> = createSelector(
    BoardsStoreSelectors.selectIsLoading,
    CounterStoreSelectors.selectIsLoading,
  (notesAreLoading: boolean, counterIsLoading: boolean) => {
    return notesAreLoading || counterIsLoading;
  }
);