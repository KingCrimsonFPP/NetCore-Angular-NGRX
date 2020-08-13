import { Identificable } from "src/app/shared/interfaces/identificable.interface";
import { Editable } from "src/app/shared/interfaces/editable.interface";
import { Loadable } from "src/app/shared/interfaces/loadable.interface";
import { ReducerHelper } from "./model-reducer-helper";
import { CollectionState } from "./interfaces/generic-state.interface";

export class NestedReducerHelper
    <
    TModel extends Identificable & Loadable & Editable & CollectionState<TNestedModel>,
    TNestedModel extends Identificable & Loadable & Editable
    > {

    models: ReducerHelper<TModel> = new ReducerHelper<TModel>();

    _all(modelId: number, state: CollectionState<TModel>): TNestedModel[] {
        var model = this.models._find(modelId, state);
        var result = model.Items ? model.Items : [];
        return result;
    }

    _affected(nestedModelId: number, modelId: number, state: CollectionState<TModel>): TNestedModel {
        var model = this.models._find(modelId, state);
        if (!model) return null;
        var result = this._find(nestedModelId, model);
        return result;
    }

    _notAffected(nestedModelId: number, modelId: number, state: CollectionState<TModel>): TNestedModel[] {
        var model = this.models._find(modelId, state);
        if (!model) return [];
        var result = this._excludeById(nestedModelId, model.Items);
        return result;
    }

    _genericEdit(editMode: boolean, state: CollectionState<TModel>, modelId: number, nestedModelId: number): CollectionState<TModel> {
        var result = {
            ...state,
            IsLoading: false,
            Error: null,
            Items:
                [
                    ...this.models._notAffected(modelId, state),
                    {
                        ...this.models._affected(modelId, state),
                        Items:
                            [
                                ...this._notAffected(nestedModelId, modelId, state),
                                {
                                    ...this._affected(nestedModelId, modelId, state),
                                    EditMode: editMode
                                }
                            ]
                    }
                ],
        };
        return result;
    }

    _genericChangeRequest(state: CollectionState<TModel>, modelId: number, nestedModelId: number, payload: TNestedModel): CollectionState<TModel> {
        return this._genericChangeHandler(true, true, state, modelId, nestedModelId, payload);
    }

    _genericChangeSuccess(state: CollectionState<TModel>, modelId: number, nestedModelId: number, payload: TNestedModel): CollectionState<TModel> {
        return this._genericChangeHandler(false, false, state, modelId, nestedModelId, payload);
    }

    private _genericChangeHandler(isLoading: boolean, changed: boolean, state: CollectionState<TModel>, modelId: number, nestedModelId: number, payload: TNestedModel): CollectionState<TModel> {
        var result = {
            ...state,
            IsLoading: isLoading,
            Error: null,
            Items:
                [
                    ...this.models._notAffected(modelId, state),
                    {
                        ...this.models._affected(modelId, state),
                        Items: [...this._excludeSaved(this._notAffected(nestedModelId, modelId, state))]
                    }
                ],
        };
        if (payload) {
            result.Items.find(x => x.Id === modelId).Items.push({
                ...payload,
                Error: null,
                IsLoading: isLoading,
                Changed: changed,
            });
        }
        return result;
    }

    _genericChangeFailure(state: CollectionState<TModel>, modelId: number, nestedModelId: number, error: any): CollectionState<TModel> {
        var result = {
            ...state,
            IsLoading: false,
            Error: error,
            Items: [
                ...this.models._notAffected(modelId, state),
                {
                    ...this.models._affected(modelId, state),
                    Items: [
                        ...this._notAffected(nestedModelId, modelId, state),
                        {
                            ...this._affected(nestedModelId, modelId, state),
                            Error: error,
                            IsLoading: false
                        }
                    ],
                },
            ]
        };
        return result;
    }


    _excludeById<T extends Identificable>(Id: number, array: T[]): T[] {
        var result = array.filter((item) => item.Id !== Id);
        return result;
    }

    _excludeSaved<T extends Editable & Loadable>(models: T[]): T[] {
        var result = models.filter(model => !model.IsLoading || (!model.EditMode && !model.IsNew && !model.Error));
        return result;
    }

    _find(nestedModelId: number, model: TModel): TNestedModel {
        var result = model.Items.find((nested) => nested.Id === nestedModelId);
        return result;
    }


    AddNew(state: CollectionState<TModel>, modelId: number, newNestedModel: TNestedModel) {
        var result = {
            ...state,
            IsLoading: false,
            Error: null,
            Items: [
                ...this.models._notAffected(modelId, state),
                {
                    ...this.models._affected(modelId, state),
                    Items: [...this._all(modelId, state), newNestedModel],
                },
            ],
        };
        return result;
    }


    RemoveNew(state: CollectionState<TModel>, modelId: number, nestedModelId: number) {
        var result = {
            ...state,
            IsLoading: false,
            Error: null,
            Items: [
                ...this.models._notAffected(modelId, state),
                {
                    ...this.models._affected(modelId, state),
                    Items: [...this._notAffected(nestedModelId, modelId, state)],
                },
            ],
        };
        return result;
    }

    Edit(state: CollectionState<TModel>, modelId: number, nestedModelId: number) {
        return this._genericEdit(true, state, modelId, nestedModelId);
    }

    EditCancellation(state: CollectionState<TModel>, modelId: number, nestedModelId: number) {
        return this._genericEdit(false, state, modelId, nestedModelId);
    }

    SaveRequest(state: CollectionState<TModel>, modelId: number, nestedModelId: number, payload: TNestedModel) {
        return this._genericChangeRequest(state, modelId, nestedModelId, payload);
    }

    SaveFailure(state: CollectionState<TModel>, modelId: number, nestedModelId: number, error) {
        return this._genericChangeFailure(state, modelId, nestedModelId, error);
    }

    SaveSuccess(state: CollectionState<TModel>, modelId: number, nestedModelId: number, payload: TNestedModel) {
        return this._genericChangeSuccess(state, modelId, nestedModelId, payload);
    }


    DeleteRequest(state: CollectionState<TModel>, modelId: number, nestedModelId: number) {
        return this._genericChangeRequest(state, modelId, nestedModelId, null);
    }

    DeleteFailure(state: CollectionState<TModel>, modelId: number, nestedModelId: number, error) {
        return this._genericChangeFailure(state, modelId, nestedModelId, error);
    }

    DeleteSuccess(state: CollectionState<TModel>, modelId: number, nestedModelId: number) {
        return this._genericChangeSuccess(state, modelId, nestedModelId, null);
    }

}