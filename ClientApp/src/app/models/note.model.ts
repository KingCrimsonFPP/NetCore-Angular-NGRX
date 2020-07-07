import { IEditable } from "./ieditable.interface";

export class Note implements IEditable
{
    public Id: number;
    public Title:string;
    public Date: Date;
    public BoardId: number;
    public Description: string;
        
    // IEditable
    public EditMode: boolean;
    public IsNew: boolean;
    public IsSaving: boolean;
}
