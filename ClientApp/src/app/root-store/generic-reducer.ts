import { Identificable } from "src/app/models/Interfaces/identificable.interface";
import { Editable } from "src/app/models/Interfaces/editable.interface";
import { Loadable } from "src/app/models/Interfaces/loadable.interface";
import { GenericState } from "../models/Interfaces/generic-state.interface";

export class GenericReducer<TModel extends Identificable & Loadable & Editable> {

    excludeSaved(models: TModel[]): TModel[] {
        var result = models.filter(model => !model.IsLoading || (!model.EditMode && !model.IsNew && !model.Error));
        return result;
    }

    affected(itemId: number, state: GenericState<TModel>): TModel {
        var result = this.findItem(itemId, state);
        return result;
    }

    notAffected(itemId: number, state: GenericState<TModel>): TModel[] {
        var result = this.excludeById(itemId, state.Items);
        return result;
    }

    genericEdit(editMode: boolean, state: GenericState<TModel>, itemId: number): GenericState<TModel> {
        var result = {
            ...state,
            IsLoading: false,
            Error: null,
            Items:
                [
                    ...this.notAffected(itemId, state),
                    {
                        ...this.affected(itemId, state),
                        EditMode: editMode
                    }
                ],
        };
        return result;
    }

    genericChangeRequest(state: GenericState<TModel>, itemId: number, payload: TModel): GenericState<TModel> {
        return this.genericChangeHandler(true, true, state, itemId, payload);
    }

    genericChangeSuccess(state: GenericState<TModel>, itemId: number, payload: TModel): GenericState<TModel> {
        return this.genericChangeHandler(false, false, state, itemId, payload);
    }

    private genericChangeHandler(isLoading: boolean, changed: boolean, state: GenericState<TModel>, itemId: number, payload: TModel): GenericState<TModel> {
        var result = {
            ...state,
            IsLoading: isLoading,
            Error: null,
            Items: [...this.excludeSaved(this.notAffected(itemId, state))],
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

    genericChangeFailure(state: GenericState<TModel>, itemId: number, error: any): GenericState<TModel> {
        var result = {
            ...state,
            IsLoading: false,
            Error: error,
            Items: [
                ...this.notAffected(itemId, state),
                {
                    ...this.affected(itemId, state),
                    Error: error,
                    IsLoading: false
                },
            ]
        };
        return result;
    }

    private excludeById(Id: number, array: TModel[]): TModel[] {
        var result = array.filter((item) => item.Id !== Id);
        return result;
    }

    private findItem(itemId: number, state: GenericState<TModel>): TModel {
        return state.Items.find((item) => item.Id === itemId);
    }
}