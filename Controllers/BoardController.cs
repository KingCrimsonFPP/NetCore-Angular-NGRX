using Microsoft.AspNetCore.Mvc;
using NetCoreAngularNgrx.Common;
using NetCoreAngularNgrx.Common.Models;
using NetCoreAngularNgrx.Controllers.Common;
using NetCoreAngularNgrx.Repositories;
using System;
using System.Collections.Generic;

namespace NetCoreAngularNgrx.Controllers
{

    [Route("api/[controller]")]

    public class BoardController : BaseController<Board,int>
    {
        public BoardController(IBoardRepository dataRepository, IDataRepository<Note> noteRepository) : base(dataRepository)
        {
            NoteRepository = noteRepository;
            BoardRepository = dataRepository;
        }

        private IDataRepository<Note> NoteRepository { get; }
        private IBoardRepository BoardRepository { get; }

        protected override bool ValidateId(int id)
        {
            if (id <= 0) throw new ArgumentOutOfRangeException(nameof(id), Constants.IndexOutOfRange);

            return true;
        }

        [HttpGet("all")]
        public override IEnumerable<Board> GetAll()
        {
            var result = BoardRepository.GetAllBoardAndNotes();
            return result;
        }

        [HttpPost]
        public override Board Add(Board board)
        {
            board.Id = 0;
            return base.Add(board);
        }

        [HttpPost("{boardId}/notes")]
        public IActionResult AddNoteToBoard(int boardId, [FromBody] Note newNote)
        {
            ValidateId(boardId);

            if (Get(boardId) == null) return NotFound();

            newNote.Id = 0;
            newNote.BoardId = boardId;
            var result = NoteRepository.Add(newNote);

            return Ok(result);
        }

        [HttpGet("{boardId}/notes")]
        public IActionResult GetAllNotesInBoard(int boardId)
        {
            ValidateId(boardId);

            var board = Get(boardId);
            if (board == null) return NotFound();

            var result = board.Items ?? new List<Note>();
            return Ok(result);
        }

        [HttpDelete("{boardId}/notes/{noteId}")]
        public IActionResult DeleteNoteInBoard(int boardId, int noteId)
        {
            ValidateId(boardId);
            ValidateId(noteId);

            if (Get(boardId) == null) return NotFound();

            var note = NoteRepository.Get(noteId);
            if (note == null) return NotFound();

            var result = NoteRepository.Delete(note.Id);

            return Ok(result);
        }

        [HttpPatch("{boardId}/notes/{noteId}")]
        public virtual IActionResult UpdateNote(int boardId, int noteId, [FromBody] Note model)
        {
            ValidateId(boardId);
            ValidateId(noteId);

            if (Get(boardId) == null) return NotFound();

            var note = NoteRepository.Get(noteId);
            if (note == null) return NotFound();

            note.Id = noteId;
            note.BoardId = boardId;
            note.Title = model.Title;
            note.Description = model.Description;

            var result = NoteRepository.Update(note);

            return Ok(result);
        }
    }
}
