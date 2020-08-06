import { Identificable } from "./identificable.interface";
import { Loadable } from "./loadable.interface";

export interface GenericState<TModel extends Identificable & Loadable> extends Loadable {
    Items: Array<TModel>;
}