import { Note } from "./note.model";
import { IEditable } from "./Interfaces/editable.interface";
import { IIdentificable } from "./Interfaces/identificable.interface";
import { ILoadable } from "./Interfaces/loadable.interface";


export class Board implements IEditable, ILoadable, IIdentificable
{
    
    public Id: number;
    public Title: string;
    public Date: Date;
    public Notes: Note[];
    
    // IEditable
    public EditMode: boolean;
    public IsNew: boolean;
    public Changed: boolean;
    //ILoadable
    public IsLoading: boolean;
    public Error: any;
}