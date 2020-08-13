using Microsoft.EntityFrameworkCore;
using NetCoreAngularNgrx.Common.Models;
using NetCoreAngularNgrx.Repositories.Common;
using System.Collections.Generic;

namespace NetCoreAngularNgrx.Repositories
{
    public class BoardRepository : EfDataRepository<Board>, IBoardRepository
    {
        public BoardRepository(DataDbContext ctx) : base(ctx) { }

        protected override DbSet<Board> GetDtSet() => Ctx.Boards;
        public IEnumerable<Board> GetAllBoardAndNotes()
        {
           return this.Ctx.Boards.Include(x => x.Items);
        }
    }
}
