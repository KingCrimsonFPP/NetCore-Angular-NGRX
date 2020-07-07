// import { async, ComponentFixture, TestBed } from "@angular/core/testing";
// import { NoteComponent } from "./note.component";
// import { of } from "rxjs";
// import { FormsModule } from "@angular/forms";
// import { NoteService } from "../../services/Note.service";
// import { DebugElement } from "@angular/core";
// import { Note } from "src/app/models/note.model";

// describe("NoteComponent", () => {
//   let component: NoteComponent;
//   let fixture: ComponentFixture<NoteComponent>;
//   let  mockNoteService: any;

//   var sampleNote: Note = {
//     Id: 1,
//     Date: new Date(),
//     Description: "some random text",
//     EditMode: false,
//     IsNew: false,
//     BoardId:0,
//     Title:'',
//     IsSaving:false
//   };

//   beforeEach(async(() => {
//      mockNoteService = jasmine.createSpyObj("NoteService", [
//       "Add",
//       "GetAll",
//       "Delete",
//     ]);

//     mockNoteService.Delete.and.returnValue(of(true));
//     mockNoteService.Add.and.returnValue(of(null));

//     TestBed.configureTestingModule({
//       imports: [FormsModule],
//       declarations: [NoteComponent],
//       providers: [{ provide: NoteService, useValue: mockNoteService }],
//     }).compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(NoteComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it("should create", () => {
//     expect(component).toBeTruthy();
//   });

//   it("should not show if model is null", () => {
//     expect(component).toBeTruthy();
//     const root: HTMLElement = fixture.nativeElement;
//     var Notes = root.getElementsByClassName("Note-card");
//     expect(Notes).toBeTruthy();
//     expect(Notes.length).toEqual(0);
//   });

//   it("should show if model is not null", () => {
//     expect(component).toBeTruthy();
//     var Note: Note = { ...sampleNote };
//     component.noteModel = Note;
//     fixture.detectChanges();
//     const root: HTMLElement = fixture.nativeElement;
//     var Notes = root.getElementsByClassName("Note-card");
//     expect(Notes).toBeTruthy();
//     expect(Notes.length).toEqual(1);
//     expect(Notes[0].textContent).toContain(Note.Description);
//   });  

//   [true, false].forEach((isNew) => {
//     it(`when is ${(isNew?'':'not')} new should ${(isNew?'hide':'show')} created date and delete button.`,() => {
//     expect(component).toBeTruthy();
//     component.noteModel = { ...sampleNote, New: isNew };
//     fixture.detectChanges();
//     var root = fixture.debugElement;
//     checkIfShoulfBeShown(root, !isNew, ".Note-created-date");
//     checkIfShoulfBeShown(root, !isNew, ".btn-delete-Note");
//   });
// });

//   [true, false].forEach((isEditMode) => {
//     it(`when editMode is ${isEditMode} should ${(isEditMode?'':'not')} show in edit mode`,() => {
//         expect(component).toBeTruthy();
//         var Note: Note = { ...sampleNote, EditMode: isEditMode };
//         component.noteModel = Note;
//         fixture.detectChanges();
//         const root = fixture.debugElement;

//         checkIfShoulfBeShown(root, true, ".Note-created-date");        
//         checkIfShoulfBeShown(root, isEditMode,".input-text-Note");
//         checkIfShoulfBeShown(root, isEditMode, ".btn-save-Note");
//         checkIfShoulfBeShown(root, isEditMode, ".btn-cancel-Note");        
//         checkIfShoulfBeShown(root, !isEditMode, ".lbl-text-Note");
//       }
//     );
//   });

//   it(`when button delete is clicked should call service's delete function and refresh.`,() => {
//     expect(component).toBeTruthy();
//     component.noteModel = { ...sampleNote, New: false };
//     fixture.detectChanges();
//     var element = fixture.debugElement.nativeElement.querySelector('.btn-delete-Note')
//     var eventUpdate = spyOn(component.updated, 'emit');
//     element.click();    
//     expect(mockNoteService.Delete).toHaveBeenCalledTimes(1);    
//     expect(eventUpdate).toHaveBeenCalledTimes(1);    
//   });
  
//   it(`when button save is clicked should call service's save function and refresh.`,() => {
//     expect(component).toBeTruthy();
//     component.noteModel = { ...sampleNote, EditMode: true };
//     var eventUpdate = spyOn(component.updated, 'emit');
//     fixture.detectChanges();
//     var element = fixture.debugElement.nativeElement.querySelector('.btn-save-Note')
//     element.click();    
//     expect(mockNoteService.Add).toHaveBeenCalledTimes(1);    
//     expect(eventUpdate).toHaveBeenCalledTimes(1);    
//   });

//   it(`when button cancel is clicked should exit editmode and refresh.`,() => {
//     expect(component).toBeTruthy();
//     component.noteModel = { ...sampleNote, EditMode: true };
//     var eventUpdate = spyOn(component.updated, 'emit');
//     fixture.detectChanges();
//     var element = fixture.debugElement.nativeElement.querySelector('.btn-cancel-Note')
//     element.click();    
//     expect(eventUpdate).toHaveBeenCalledTimes(1);   
//     expect(component.noteModel.EditMode).toEqual(false); 
//   });

//   let checkIfShoulfBeShown = function (
//     root: DebugElement,
//     shouldShow: boolean,
//     elementClassName: string
//   ) {
//     var element = root.nativeElement.querySelector(elementClassName);
//     var isShowm = !!element;
//     var result = isShowm === shouldShow
//                 ? "success"
//                 : `${elementClassName} was supposed to ${shouldShow ? "be shown" : "be hidden"}.`;
 
//     expect(result).toEqual("success");
//   };
// });
