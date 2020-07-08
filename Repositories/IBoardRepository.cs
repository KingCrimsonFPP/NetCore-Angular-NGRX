using NetCoreAngularNgrx.Common.Models;
using System.Collections.Generic;

namespace NetCoreAngularNgrx.Repositories
{
    public interface IBoardRepository : IDataRepository<Board>
    {
        IEnumerable<Board> GetAllBoardAndNotes();
    }
}
