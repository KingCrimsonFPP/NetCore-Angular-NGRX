import { Editable } from "../shared/interfaces/editable.interface";
import { Identificable } from "../shared/interfaces/identificable.interface";
import { Loadable } from "../shared/interfaces/loadable.interface";

export class Note implements Editable, Loadable, Identificable
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
