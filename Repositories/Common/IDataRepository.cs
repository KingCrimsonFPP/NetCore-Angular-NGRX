using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace NetCoreAngularNgrx.Repositories
{
    public interface IDataRepository<T>
    {
        T Get(params object[] keyValues);
        IEnumerable<T> Filter(Expression<Func<T, bool>> expression);
        IEnumerable<T> GetAll();
        T Add(T weatherForecast);
        T Update(T itemChanges);
        T Delete(params object[] keyValues);
    }
}
