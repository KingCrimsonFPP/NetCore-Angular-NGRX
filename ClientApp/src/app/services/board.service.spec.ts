import { BoardService } from "./board.service";
import { of } from "rxjs";
import { Board } from "../models/board.model";

describe("BoardService", () => {
  let service: BoardService;
  let baseUrl = "baseUrl";
  let mockHttpClient: any;
  beforeEach(() => {
    mockHttpClient = jasmine.createSpyObj("HttpClient", [
      "post",
      "get",
      "delete",
    ]);
    mockHttpClient.get.and.returnValue(of([new Board()]));

    service = new BoardService(mockHttpClient, "base");
  });

  [true, false].forEach((value) => {
    it(`#Delete should return ${value} from httpclient`, (done: DoneFn) => {
      mockHttpClient.delete.and.returnValue(of(value));
      service.Delete(0).subscribe((value) => {
        expect(value).toEqual(value);
        done();
      });
    });
  });

  it("#Add should return value from httpclient", (done: DoneFn) => {
    var newBoard: Board = { ...new Board(), Id: 99 };
    mockHttpClient.post.and.returnValue(of(newBoard));

    service.Add(newBoard).subscribe((value) => {
      expect(value).toEqual(newBoard);
      expect(value.Id).toEqual(newBoard.Id);
      done();
    });
  });

  it("#Find should return value from httpclient", (done: DoneFn) => {
    var expected: Board = { ...new Board(), Id: 99 };
    mockHttpClient.get.and.returnValue(of(expected));

    service.Find(99).subscribe((value) => {
      expect(value).toEqual(expected);
      expect(value.Id).toEqual(expected.Id);
      done();
    });
  });

  it("#GetAll should return value from httpclient", (done: DoneFn) => {
    var expected: Board[] = [
      { ...new Board(), Id: 99 },
      { ...new Board(), Id: 98 },
      { ...new Board(), Id: 97 },
    ];
    mockHttpClient.get.and.returnValue(of(expected));

    service.GetAll().subscribe((value) => {
      expect(value).toEqual(expected);
      expect(value.length).toEqual(expected.length);
      expect(value[0].Id).toEqual(expected[0].Id);
      expect(value[1].Id).toEqual(expected[1].Id);
      expect(value[2].Id).toEqual(expected[2].Id);
      done();
    });
  });
});
