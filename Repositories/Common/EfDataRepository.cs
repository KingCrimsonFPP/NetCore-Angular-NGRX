using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace NetCoreAngularNgrx.Repositories.Common
{
    public abstract class EfDataRepository<T> : IDataRepository<T> where T : class
    {
        protected readonly DataDbContext Ctx;

        protected EfDataRepository(DataDbContext ctx)
        {
            this.Ctx = ctx;
        }

        protected abstract DbSet<T> GetDtSet();

        public virtual IEnumerable<T> Filter(Expression<Func<T, bool>> expression)
        {
            return GetDtSet().Where(expression);
        }

        public virtual T Get(params object[] keyValues)
        {
            return GetDtSet().Find(keyValues);
        }

        public virtual IEnumerable<T> GetAll()
        {
            return GetDtSet();
        }

        public virtual T Add(T item)
        {
            var result = GetDtSet().Add(item);
            Ctx.SaveChanges();
            return result.Entity;
        }

        public virtual T Update(T itemChanges)
        {
            var item = GetDtSet().Attach(itemChanges);
            item.State = EntityState.Modified;
            Ctx.SaveChanges();
            return itemChanges;
        }

        public virtual T Delete(params object[] keyValues)
        {
            var contact = GetDtSet().Find(keyValues);
            if (contact != null)
            {
                var result = GetDtSet().Remove(contact);
                Ctx.SaveChanges();
                return result.Entity;
            }

            return default(T);
        }
    }
}
