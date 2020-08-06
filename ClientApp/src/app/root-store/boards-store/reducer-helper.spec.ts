import { ReducerHelper } from "./reducer-helper";
import { Board } from "src/app/models/board.model";
import { BoardsState } from "./state";

fdescribe("ReducerHelper", () => {

  var board01, board02, board03, board04, board05, board06, board07, board08, board09, board10, board11, board12, board13, board14, board15, board16: Board;
  var defaultTestData: Board[];

  beforeEach(() => {

    board01 = { ...new Board(), Id: 1, IsLoading: true, EditMode: true, IsNew: true, Error: true };
    board02 = { ...new Board(), Id: 2, IsLoading: true, EditMode: true, IsNew: true, Error: false };
    board03 = { ...new Board(), Id: 3, IsLoading: true, EditMode: true, IsNew: false, Error: true };
    board04 = { ...new Board(), Id: 4, IsLoading: true, EditMode: true, IsNew: false, Error: false };
    board05 = { ...new Board(), Id: 5, IsLoading: true, EditMode: false, IsNew: true, Error: true };
    board06 = { ...new Board(), Id: 6, IsLoading: true, EditMode: false, IsNew: true, Error: false };
    board07 = { ...new Board(), Id: 7, IsLoading: true, EditMode: false, IsNew: false, Error: true };
    board08 = { ...new Board(), Id: 8, IsLoading: true, EditMode: false, IsNew: false, Error: false };
    board09 = { ...new Board(), Id: 9, IsLoading: false, EditMode: true, IsNew: true, Error: true };
    board10 = { ...new Board(), Id: 10, IsLoading: false, EditMode: true, IsNew: true, Error: false };
    board11 = { ...new Board(), Id: 11, IsLoading: false, EditMode: true, IsNew: false, Error: true };
    board12 = { ...new Board(), Id: 12, IsLoading: false, EditMode: true, IsNew: false, Error: false };
    board13 = { ...new Board(), Id: 13, IsLoading: false, EditMode: false, IsNew: true, Error: true };
    board14 = { ...new Board(), Id: 14, IsLoading: false, EditMode: false, IsNew: true, Error: false };
    board15 = { ...new Board(), Id: 15, IsLoading: false, EditMode: false, IsNew: false, Error: true };
    board16 = { ...new Board(), Id: 16, IsLoading: false, EditMode: false, IsNew: false, Error: false };

    defaultTestData = [board01, board02, board03, board04, board05, board06, board07, board08,
      board09, board10, board11, board12, board13, board14, board15, board16];
  });

  it(`ReducerHelper.excludeSaved`, (next: DoneFn) => {

    var output = ReducerHelper.excludeSaved(defaultTestData)

    expect(output).toBeTruthy();
    expect(output).not.toContain(board01, 'did contain board01');
    expect(output).not.toContain(board02, 'did contain board02');
    expect(output).not.toContain(board03, 'did contain board03');
    expect(output).not.toContain(board04, 'did contain board04');
    expect(output).not.toContain(board05, 'did contain board05');
    expect(output).not.toContain(board06, 'did contain board06');
    expect(output).not.toContain(board07, 'did contain board07');
    expect(output).toContain(board08, 'did not contain board08');
    expect(output).toContain(board09, 'did not contain board09');
    expect(output).toContain(board10, 'did not contain board10');
    expect(output).toContain(board11, 'did not contain board11');
    expect(output).toContain(board12, 'did not contain board12');
    expect(output).toContain(board13, 'did not contain board13');
    expect(output).toContain(board14, 'did not contain board14');
    expect(output).toContain(board15, 'did not contain board15');
    expect(output).toContain(board16, 'did not contain board16');

    next();
  });

  it(`ReducerHelper.affectedBoard`, (next: DoneFn) => {
    var state: BoardsState =
    {
      IsLoading: false,
      Error: null,
      Items: [...defaultTestData],
    };
    var output = ReducerHelper.affectedBoard(board07.Id,state)

    expect(output).toBeTruthy();
    expect(output.Id).toBeTruthy();
    expect(output.Id).toEqual(board07.Id);

    next();
  });

  it(`ReducerHelper.notAffectedBoards`, (next: DoneFn) => {
    var state: BoardsState =
    {
      IsLoading: false,
      Error: null,
      Items: [...defaultTestData],
    };
    var output = ReducerHelper.notAffectedBoards(board07.Id,state)

    expect(output).toBeTruthy();
    expect(output).toContain(board01, 'did not contain board01');
    expect(output).toContain(board02, 'did not contain board02');
    expect(output).toContain(board03, 'did not contain board03');
    expect(output).toContain(board04, 'did not contain board04');
    expect(output).toContain(board05, 'did not contain board05');
    expect(output).toContain(board06, 'did not contain board06');
    expect(output).not.toContain(board07, 'did contain board07');
    expect(output).toContain(board08, 'did not contain board08');
    expect(output).toContain(board09, 'did not contain board09');
    expect(output).toContain(board10, 'did not contain board10');
    expect(output).toContain(board11, 'did not contain board11');
    expect(output).toContain(board12, 'did not contain board12');
    expect(output).toContain(board13, 'did not contain board13');
    expect(output).toContain(board14, 'did not contain board14');
    expect(output).toContain(board15, 'did not contain board15');
    expect(output).toContain(board16, 'did not contain board16');

    next();
  });

  it(`ReducerHelper.genericBoardEdit`, (next: DoneFn) => {
    var editMode = true;
    var boardId = board10.Id;
    var testData = [ board10, board11, board12, board13, board14, board15, board16];
    var state: BoardsState =
    {
      IsLoading: false,
      Error: null,
      Items: testData,
    };
    var output = ReducerHelper.genericBoardEdit(editMode/*:boolean*/, state/*:BoardsState*/, boardId/*:number*/);

    expect(output).toBeTruthy();
    expect(output.Items).toBeTruthy();
      
    expect(output.Items).toContain(board05, 'did not contain board05');
    var editMode05 = output.Items.find(x=>x.Id=board05.Id).EditMode;
    expect(editMode05).toEqual(true, 'board05.EditMode should be true');
  
    expect(output.Items).toContain(board06, 'did not contain board06');
    var editMode06 = output.Items.find(x=>x.Id=board06.Id).EditMode;
    expect(editMode06).toEqual(false, 'board06.EditMode should be false');
  
    expect(output.Items).toContain(board07, 'did not contain board07');
    var editMode07 = output.Items.find(x=>x.Id=board07.Id).EditMode;
    expect(editMode07).toEqual(false, 'board07.EditMode should be false');
  
    expect(output.Items).toContain(board08, 'did not contain board08');
    var editMode08 = output.Items.find(x=>x.Id=board08.Id).EditMode;
    expect(editMode08).toEqual(false, 'board08.EditMode should be false');
   
    expect(output.Items).toContain(board13, 'did not contain board13');
    var editMode13 = output.Items.find(x=>x.Id=board13.Id).EditMode;
    expect(editMode13).toEqual(false, 'board13.EditMode should be false');

    expect(output.Items).toContain(board14, 'did not contain board14');
    var editMode14 = output.Items.find(x=>x.Id=board14.Id).EditMode;
    expect(editMode14).toEqual(false, 'board14.EditMode should be false');
   
    expect(output.Items).toContain(board15, 'did not contain board15');
    var editMode15 = output.Items.find(x=>x.Id=board15.Id).EditMode;
    expect(editMode15).toEqual(false, 'board15.EditMode should be false');
  
    expect(output.Items).toContain(board16, 'did not contain board16');
    var editMode16 = output.Items.find(x=>x.Id=board16.Id).EditMode;
    expect(editMode16).toEqual(false, 'board16.EditMode should be false');

    next();
  });
});

