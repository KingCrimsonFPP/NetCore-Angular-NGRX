using Microsoft.AspNetCore.Mvc;
using NetCoreAngularNgrx.Repositories;
using System.Collections.Generic;

namespace NetCoreAngularNgrx.Controllers.Common
{
    public abstract class BaseController<T,TIdType> : Controller
    {
        protected BaseController(IDataRepository<T> dataRepository)
        {
            DataRepository = dataRepository;
        }

        protected IDataRepository<T> DataRepository { get; }

        protected virtual bool ValidateId(TIdType id) => true;
        protected virtual bool ValidateModel(T id) => true;

        [HttpGet("all")]
        public virtual IEnumerable<T> GetAll()
        {
            var result = DataRepository.GetAll();
            return result;
        }

        [HttpGet("{id}")]
        public virtual T Get(TIdType id)
        {
            ValidateId(id);

            var result = DataRepository.Get(id);
            return result;
        }

        [HttpDelete("{id}")]
        public virtual T Delete(TIdType id)
        {
            ValidateId(id);

            var result = DataRepository.Delete(id);
            return result;
        }

        [HttpPost]
        public virtual T Add([FromBody]T T)
        {
            var result = DataRepository.Add(T);
            return result;
        }

        [HttpPatch]
        public virtual T Update([FromBody]T T)
        {
            var result = DataRepository.Update(T);
            return result;
        }
    }
}