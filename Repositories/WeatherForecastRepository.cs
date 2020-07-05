using NetCoreAngularNgrx.Common.Models;
using NetCoreAngularNgrx.Repositories.Common;
using Microsoft.EntityFrameworkCore;

namespace NetCoreAngularNgrx.Repositories
{
    public class WeatherForecastRepository : EfDataRepository<WeatherForecast>
    {
        public WeatherForecastRepository(DataDbContext ctx) : base(ctx) { }

        protected override DbSet<WeatherForecast> GetDtSet() => Ctx.WeatherForecasts;
    }
}
