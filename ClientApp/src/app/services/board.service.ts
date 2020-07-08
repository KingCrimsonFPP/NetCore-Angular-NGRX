import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Board } from "../models/board.model";

@Injectable()
export class BoardService {
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  public Add(model: Board): Observable<Board> {
    var endpoint = this.baseUrl + 'api/board/';
    return this.http.post<Board>(endpoint, model);
  }

  public Patch(model: Board): Observable<Board> {
    var endpoint = this.baseUrl + 'api/board/';
    return this.http.patch<Board>(endpoint, model);
  }

  public Find(boardId: number): Observable<Board> {
    var endpoint = this.baseUrl + 'api/board/' + boardId;
    return this.http.get<Board>(endpoint);
  }

  public GetAll(): Observable<Board[]> {
    var endpoint = this.baseUrl + 'api/board/all';
    return this.http.get<Board[]>(endpoint);
  }

  public Delete(boardId: number): Observable<Board> {
    var endpoint = this.baseUrl + 'api/board/' + boardId;
    return this.http.delete<Board>(endpoint);
  }
}