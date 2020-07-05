import { IEditable } from "./editable.interface";

export class Note implements IEditable
{
    public Id: number;
    public Title:string;
    public Date: Date;
    public BoardId: number;
    public Description: string;
        
    // IEditable
    public EditMode: boolean;
    public New: boolean;
    public NewId: number | null;
}
