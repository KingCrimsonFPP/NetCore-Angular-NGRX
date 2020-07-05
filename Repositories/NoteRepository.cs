using AssessmentPreparation.Common.Models;
using AssessmentPreparation.Repositories.Common;
using Microsoft.EntityFrameworkCore;

namespace AssessmentPreparation.Repositories
{
    public class NoteRepository : EfDataRepository<Note>
    {
        public NoteRepository(DataDbContext ctx) : base(ctx) { }

        protected override DbSet<Note> GetDtSet() => Ctx.Notes;
    }
}
