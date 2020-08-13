import { Note } from "./note.model";
import { Editable } from "../shared/interfaces/editable.interface";
import { Identificable } from "../shared/interfaces/identificable.interface";
import { Loadable } from "../shared/interfaces/loadable.interface";
import { CollectionState } from "../shared/interfaces/generic-state.interface";

export class Board implements Editable, Loadable, Identificable, CollectionState<Note>
{
    public Id: number;
    public Title: string;
    public Date: Date;
    public Items: Note[];

    // IEditable
    public EditMode: boolean;
    public IsNew: boolean;
    public Changed: boolean;
    //ILoadable
    public IsLoading: boolean;
    public Error: any;
}