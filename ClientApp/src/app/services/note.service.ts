import { Injectable, Inject } from "@angular/core";
import { HttpClient, HttpUrlEncodingCodec } from "@angular/common/http";
import { Observable } from "rxjs";
import { Note } from "../models/note.model";

@Injectable()
export class NoteService
{
    constructor(private http: HttpClient,@Inject('BASE_URL') private baseUrl: string) { }

    public Add(boardId: number, model:Note) : Observable<Note>
    {
      var endpoint = this.baseUrl+'api/board/'+boardId+'/notes';
      return this.http.post<Note>(endpoint,model);
    }

    public Patch(boardId: number, model:Note) : Observable<Note>
    {
      var endpoint = this.baseUrl+'api/board/'+boardId+'/notes';
      return this.http.patch<Note>(endpoint,model);
    }
    public GetAll(boardId: number) : Observable<Note[]>
    {
      var endpoint=this.baseUrl+'api/board/'+boardId+'/notes';
      return this.http.get<Note[]>(endpoint);
    }

    public Delete(boardId: number, noteId: number) : Observable<Note>
    {
      var endpoint=this.baseUrl+'api/board/'+boardId+'/notes/'+noteId;
      return this.http.delete<Note>(endpoint);
    }
}