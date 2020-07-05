using System;
using System.Collections.Generic;
using System.Linq;
using NetCoreAngularNgrx.Common;
using NetCoreAngularNgrx.Common.Models;
using NetCoreAngularNgrx.Controllers.Common;
using NetCoreAngularNgrx.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace NetCoreAngularNgrx.Controllers
{

    [Route("api/[controller]")]

    public class BoardController : BaseController<Board,int>
    {
        protected override bool ValidateId(int id)
        {
            if (id <= 0) throw new ArgumentOutOfRangeException(nameof(id), Constants.IndexOutOfRange);

            return base.ValidateId(id);
        }

        public BoardController(IDataRepository<Board> dataRepository) : base(dataRepository)
        {
        }

        [HttpPost("{id}/notes")]
        public IActionResult AddNoteToBoard(int id, [FromBody] Note newNote)
        {
            ValidateId(id);

            var board = Get(id);
            if (board == null) return NotFound();
            if (board.Notes?.Any() != true) board.Notes = new List<Note>();
            board.Notes.Add(newNote);
            Update(board);

            return Ok(newNote);
        }

        [HttpGet("{id}/notes")]
        public IActionResult GetAllNotesInBoard(int id)
        {
            ValidateId(id);

            var board = Get(id);
            if (board == null) return NotFound();

            var result = board.Notes ?? new List<Note>();
            return Ok(result);
        }

        [HttpDelete("{id}/notes/{noteId}")]
        public IActionResult DeletePostItInBoard(int id, int noteId)
        {
            ValidateId(id);

            var board = Get(id);
            if (board == null) return NotFound();
            
            var toBerRemoved= board.Notes?.FirstOrDefault(x=>x.Id==noteId);
            if (toBerRemoved == null) return NotFound();

            board.Notes.Remove(toBerRemoved);
            Update(board);

            return Ok(toBerRemoved);
        }
    }
}
