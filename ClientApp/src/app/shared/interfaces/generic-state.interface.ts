import { Identificable } from "./identificable.interface";
import { Loadable } from "./loadable.interface";

export interface CollectionState<TModel extends Identificable & Loadable> extends Loadable {
    Items: Array<TModel>;   
}