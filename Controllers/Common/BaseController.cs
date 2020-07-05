using System.Collections.Generic;
using NetCoreAngularNgrx.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace NetCoreAngularNgrx.Controllers.Common
{
    public abstract class BaseController<T,TIdType> : Controller
    {
        protected BaseController(IDataRepository<T> dataRepository)
        {
            DataRepository = dataRepository;
        }

        private IDataRepository<T> DataRepository { get; }

        protected virtual bool ValidateId(TIdType id) => true;
        protected virtual bool ValidateModel(T id) => true;

        [HttpGet("all")]
        public virtual IEnumerable<T> GetAll()
        {
            return DataRepository.GetAll();
        }

        [HttpGet("{id}")]
        public virtual T Get(TIdType id)
        {
            ValidateId(id);

            return DataRepository.Get(id);
        }

        [HttpDelete("{id}")]
        public virtual T Delete(TIdType id)
        {
            ValidateId(id);

            return DataRepository.Delete(id);
        }

        [HttpPost]
        public virtual T Add(T T)
        {
            return DataRepository.Add(T);
        }

        [HttpPatch]
        public virtual T Update(T T)
        {
            return DataRepository.Update(T);
        }
    }
}
