using NetCoreAngularNgrx.Common.Models;
using NetCoreAngularNgrx.Repositories.Common;
using Microsoft.EntityFrameworkCore;

namespace NetCoreAngularNgrx.Repositories
{
    public class NoteRepository : EfDataRepository<Note>
    {
        public NoteRepository(DataDbContext ctx) : base(ctx) { }

        protected override DbSet<Note> GetDtSet() => Ctx.Notes;
    }
}
