using AssessmentPreparation.Common.Models;
using AssessmentPreparation.Repositories.Common;
using Microsoft.EntityFrameworkCore;

namespace AssessmentPreparation.Repositories
{
    public class BoardRepository : EfDataRepository<Board>
    {
        public BoardRepository(DataDbContext ctx) : base(ctx) { }

        protected override DbSet<Board> GetDtSet() => Ctx.Boards;
    }
}
