import { of } from "rxjs";
import { NoteService } from "./note.service";
import { Note } from "../models/note.model";

describe("NoteService", () => {
  let service: NoteService;
  let baseUrl = "baseUrl";
  let mockHttpClient: any;
  beforeEach(() => {
    mockHttpClient = jasmine.createSpyObj("HttpClient", [
      "post",
      "get",
      "delete",
    ]);
    mockHttpClient.get.and.returnValue(of([new Note()]));

    service = new NoteService(mockHttpClient, "base");
  });

  [true, false].forEach((value) => {
    it(`#Delete should return ${value} from httpclient`, (done: DoneFn) => {
      mockHttpClient.delete.and.returnValue(of(value));
      service.Delete(0,0).subscribe((value) => {
        expect(value).toEqual(value);
        done();
      });
    });
  });

  it("#Add should return value from httpclient", (done: DoneFn) => {
    var newNote: Note = { ...new Note(), Id: 99 };
    mockHttpClient.post.and.returnValue(of(newNote));

    service.Add(0,newNote).subscribe((value) => {
      expect(value).toEqual(newNote);
      expect(value.Id).toEqual(newNote.Id);
      done();
    });
  });

  it("#GetAll should return value from httpclient", (done: DoneFn) => {
    var expected: Note[] = [
      { ...new Note(), Id: 99 },
      { ...new Note(), Id: 98 },
      { ...new Note(), Id: 97 },
    ];
    mockHttpClient.get.and.returnValue(of(expected));

    service.GetAll(0).subscribe((value) => {
      expect(value).toEqual(expected);
      expect(value.length).toEqual(expected.length);
      expect(value[0].Id).toEqual(expected[0].Id);
      expect(value[1].Id).toEqual(expected[1].Id);
      expect(value[2].Id).toEqual(expected[2].Id);
      done();
    });
  });
});
