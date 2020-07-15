import { IEditable } from "./Interfaces/editable.interface";
import { IIdentificable } from "./Interfaces/identificable.interface";
import { ILoadable } from "./Interfaces/loadable.interface";

export class Note implements IEditable, ILoadable, IIdentificable
{
    public Id: number;
    public Title:string;
    public Date: Date;
    public BoardId: number;
    public Description: string;
        
    // IEditable
    public EditMode: boolean;
    public IsNew: boolean;
    public Changed: boolean;
    //ILoadable
    public IsLoading: boolean;
    public Error: any;
}
