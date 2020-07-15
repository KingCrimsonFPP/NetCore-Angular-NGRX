import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BoardComponent } from './board.component';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { BoardService } from '../../services/board.service';
import { NoteComponent } from '../note/note.component';
import { NoteService } from 'src/app/services/note.service';
import { Board } from 'src/app/models/board.model';
import { Note } from 'src/app/models/note.model';
import { sample } from 'rxjs/operators';

describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;
  let  mockBoardService: any;

  let sampleBoard: Board = new Board();
  sampleBoard.Id=1;
  sampleBoard.Title='Board#1';
  sampleBoard.Date=new Date();

beforeEach(async(() => {
  mockBoardService = jasmine.createSpyObj('BoardService', ['Add','Find','GetAll','Delete']);
  mockBoardService.GetAll.and.returnValue(of({...sampleBoard}));
  mockBoardService.Delete.and.returnValue(of({...sampleBoard}));
  
  const mockNoteService = jasmine.createSpyObj('NoteService', ['Add','GetAll','Delete']);

  TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ BoardComponent, NoteComponent ],
      providers: [ 
          { provide: BoardService, useValue: mockBoardService },
          { provide: NoteService, useValue: mockNoteService },
      ]
  })
  .compileComponents();
}));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should initialize postits collection if needed', () => {
  //   expect(component).toBeTruthy();
  //   component.boardModel= {...sampleBoard };
  //   expect(component.boardModel.Notes).toBeFalsy();
  //   component.ngOnInit();
  //   expect(component.boardModel.Notes).toBeTruthy();
  // });

  // it(`when button delete is clicked should call service's delete function and refresh.`,() => {
  //   expect(component).toBeTruthy();
  //   component.boardModel = { ...sampleBoard };
  //   fixture.detectChanges();
  //   var element = fixture.debugElement.nativeElement.querySelector('.btn-delete-board')
  //   var eventUpdate = spyOn(component.updated, 'emit');
  //   element.click();    
  //   expect(mockBoardService.Add).not.toHaveBeenCalled();    
  //   expect(mockBoardService.Delete).toHaveBeenCalledTimes(1);    
  //   expect(mockBoardService.GetAll).not.toHaveBeenCalled();    
  //   expect(eventUpdate).toHaveBeenCalledTimes(1);    
  // });

  // it(`when button Add is clicked should add one board to the clients state.`,() => {
  //   expect(component).toBeTruthy();
  //   component.boardModel = { ...sampleBoard, Notes: [new Note()] };
  //   fixture.detectChanges();
  //   var element = fixture.debugElement.nativeElement.querySelector('.btn-add-note')
  //   element.click();    
  //   expect(component.boardModel.Notes.length).toEqual(2);
  //   expect(mockBoardService.Add).not.toHaveBeenCalled();    
  //   expect(mockBoardService.GetAll).not.toHaveBeenCalled();    
  //   expect(mockBoardService.Delete).not.toHaveBeenCalled();    
  // });
});
