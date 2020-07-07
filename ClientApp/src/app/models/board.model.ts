import { Note } from "./note.model";
import { IEditable } from "./ieditable.interface";

export class Board implements IEditable
{
    public Id: number;
    public Title: string;
    public Date: Date;
    public Notes: Note[];
    
    // IEditable
    public EditMode: boolean;
    public IsNew: boolean;
    public IsSaving: boolean;
}