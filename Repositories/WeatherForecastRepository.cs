using AssessmentPreparation.Common.Models;
using AssessmentPreparation.Repositories.Common;
using Microsoft.EntityFrameworkCore;

namespace AssessmentPreparation.Repositories
{
    public class WeatherForecastRepository : EfDataRepository<WeatherForecast>
    {
        public WeatherForecastRepository(DataDbContext ctx) : base(ctx) { }

        protected override DbSet<WeatherForecast> GetDtSet() => Ctx.WeatherForecasts;
    }
}
