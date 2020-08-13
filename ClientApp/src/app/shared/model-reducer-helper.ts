import { Identificable } from "src/app/shared/interfaces/identificable.interface";
import { Editable } from "src/app/shared/interfaces/editable.interface";
import { Loadable } from "src/app/shared/interfaces/loadable.interface";
import { CollectionState } from "./interfaces/generic-state.interface";

export class ReducerHelper<TModel extends Identificable & Loadable & Editable> {
    _excludeSaved(models: TModel[]): TModel[] {
        var result = models.filter(model => !model.IsLoading || (!model.EditMode && !model.IsNew && !model.Error));
        return result;
    }

    _affected(itemId: number, state: CollectionState<TModel>): TModel {
        var result = this._find(itemId, state);
        return result;
    }

    _notAffected(itemId: number, state: CollectionState<TModel>): TModel[] {
        var result = this._excludeById(itemId, state.Items);
        return result;
    }

    _genericEdit(editMode: boolean, state: CollectionState<TModel>, itemId: number): CollectionState<TModel> {
        var result = {
            ...state,
            IsLoading: false,
            Error: null,
            Items:
                [
                    ...this._notAffected(itemId, state),
                    {
                        ...this._affected(itemId, state),
                        EditMode: editMode
                    }
                ],
        };
        return result;
    }

    _genericChangeRequest(state: CollectionState<TModel>, itemId: number, payload: TModel): CollectionState<TModel> {
        return this._genericChangeHandler(true, true, state, itemId, payload);
    }

    _genericChangeSuccess(state: CollectionState<TModel>, itemId: number, payload: TModel): CollectionState<TModel> {
        return this._genericChangeHandler(false, false, state, itemId, payload);
    }

    _genericChangeHandler(isLoading: boolean, changed: boolean, state: CollectionState<TModel>, itemId: number, payload: TModel): CollectionState<TModel> {
        var result = {
            ...state,
            IsLoading: isLoading,
            Error: null,
            Items: [...this._excludeSaved(this._notAffected(itemId, state))],
        };
        if (payload) {
            result.Items.push({
                ...payload,
                Error: null,
                IsLoading: isLoading,
                Changed: changed,
            });
        }
        return result;
    }

    _genericChangeFailure(state: CollectionState<TModel>, itemId: number, error: any): CollectionState<TModel> {
        var result = {
            ...state,
            IsLoading: false,
            Error: error,
            Items: [
                ...this._notAffected(itemId, state),
                {
                    ...this._affected(itemId, state),
                    Error: error,
                    IsLoading: false
                },
            ]
        };
        return result;
    }

    _excludeById(Id: number, array: TModel[]): TModel[] {
        var result = array.filter((item) => item.Id !== Id);
        return result;
    }

    _find(itemId: number, state: CollectionState<TModel>): TModel {
        return state.Items.find((item) => item.Id === itemId);
    }
    LoadRequest(state: CollectionState<TModel>) {
        var result = {
            ...state,
            IsLoading: true,
            Error: null,
        };
        return result;
    }

    LoadFailure(state: CollectionState<TModel>, error) {
        var result = {
            ...state,
            IsLoading: false,
            Error: error,
        };
        return result;
    }

    LoadSuccess(state: CollectionState<TModel>, payload: TModel[]) {
        var result = {
            ...state,
            IsLoading: false,
            Error: null,
            Items: [...payload],
        };
        return result;
    }

    AddNew(state: CollectionState<TModel>, newItem: TModel) {

        var result = {
            ...state,
            IsLoading: false,
            Error: null,
            Items: [...state.Items, newItem],
        };
        return result;
    }

    RemoveNew(state: CollectionState<TModel>, modelId: number) {
        var result = {
            ...state,
            IsLoading: false,
            Error: null,
            Items: [...this._notAffected(modelId, state)],
        };
        return result;
    }

    Edit(state: CollectionState<TModel>, itemId: number): CollectionState<TModel> {
        return this._genericEdit(true, state, itemId);
    }

    EditCancellation(state: CollectionState<TModel>, itemId: number): CollectionState<TModel> {
        return this._genericEdit(false, state, itemId);
    }

    SaveRequest(state: CollectionState<TModel>, itemId: number, payload: TModel): CollectionState<TModel> {
        return this._genericChangeRequest(state, itemId, payload);
    }

    SaveFailure(state: CollectionState<TModel>, itemId: number, error: any): CollectionState<TModel> {
        return this._genericChangeFailure(state, itemId, error);
    }

    SaveSuccess(state: CollectionState<TModel>, itemId: number, payload: TModel): CollectionState<TModel> {
        return this._genericChangeSuccess(state, itemId, payload);
    }

    DeleteRequest(state: CollectionState<TModel>, itemId: number): CollectionState<TModel> {
        return this._genericChangeRequest(state, itemId, null);
    }

    DeleteFailure(state: CollectionState<TModel>, itemId: number, error: any): CollectionState<TModel> {
        return this._genericChangeFailure(state, itemId, error);
    }

    DeleteSuccess(state: CollectionState<TModel>, itemId: number): CollectionState<TModel> {
        return this._genericChangeSuccess(state, itemId, null);
    }
}