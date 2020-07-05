using NetCoreAngularNgrx.Common.Models;
using NetCoreAngularNgrx.Repositories.Common;
using Microsoft.EntityFrameworkCore;

namespace NetCoreAngularNgrx.Repositories
{
    public class BoardRepository : EfDataRepository<Board>
    {
        public BoardRepository(DataDbContext ctx) : base(ctx) { }

        protected override DbSet<Board> GetDtSet() => Ctx.Boards;
    }
}
