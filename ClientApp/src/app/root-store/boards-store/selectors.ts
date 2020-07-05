import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BoardsState } from './state';
import { boardsFeatureKey } from './reducer';

const selectBoardsFeatureState = createFeatureSelector<BoardsState>(boardsFeatureKey);

export const selectError = createSelector(
    selectBoardsFeatureState,
    state => state.error
);

export const selectIsLoading = createSelector(
    selectBoardsFeatureState,
    state => state.isLoading
);

export const selectBoards = createSelector(
    selectBoardsFeatureState,
    state => state.boards
);

export const selectBoard = (boardId:number) => createSelector(
    selectBoardsFeatureState,
    state => state.boards.find(x=>x.Id==boardId)
);

export const selectNote = (boardId:number, noteId:number) => createSelector(
    selectBoardsFeatureState,
    state => 
    {
        var board =state.boards.find(x=>x.Id==boardId);
        if(!board || !board.Notes || board.Notes.length == 0) return null;
        return board.Notes.find(x=>x.Id==noteId);
    }
);