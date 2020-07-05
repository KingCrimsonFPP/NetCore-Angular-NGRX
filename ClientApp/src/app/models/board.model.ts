import { Note } from "./note.model";
import { IEditable } from "./editable.interface";

export class Board implements IEditable
{
    public Id: number;
    public Title: string;
    public Date: Date;
    public Notes: Note[];
    
    // IEditable
    public EditMode: boolean;
    public New: boolean;
    public NewId: number | null;
}