import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BoardsState } from './state';
import { boardsFeatureKey } from './reducer';

const selectBoardsFeatureState = createFeatureSelector<BoardsState>(boardsFeatureKey);

export const selectError = createSelector(
    selectBoardsFeatureState,
    state => state.Error
);

export const selectIsLoading = createSelector(
    selectBoardsFeatureState,
    state => state.IsLoading
);

export const selectBoards = createSelector(
    selectBoardsFeatureState,
    state => state.Items
);

export const selectBoard = (boardId:number) => createSelector(
    selectBoardsFeatureState,
    state => state.Items.find(x=>x.Id==boardId)
);

export const selectNote = (boardId:number, noteId:number) => createSelector(
    selectBoardsFeatureState,
    state => 
    {
        var board =state.Items.find(x=>x.Id==boardId);
        if(!board || !board.Items || board.Items.length == 0) return null;
        return board.Items.find(x=>x.Id==noteId);
    }
);