using System.Collections.Generic;

namespace AssessmentPreparation.Repositories
{
    public interface IDataRepository<T>
    {
        T Get(params object[] keyValues);
        IEnumerable<T> GetAll();
        T Add(T weatherForecast);
        T Update(T itemChanges);
        T Delete(params object[] keyValues);
    }
}
