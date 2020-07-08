using NetCoreAngularNgrx.Common.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace NetCoreAngularNgrx.Repositories.Common
{
    public static class StartupRepositories
    {
        public static IServiceCollection AddRepositories(IServiceCollection services)
        {
            services.AddDbContext<DataDbContext>(options =>
            {
                options.UseSqlite("Data Source=sqlitedemo.db");
                options.EnableSensitiveDataLogging(true);
            });
            services.AddScoped<IDataRepository<Note>, NoteRepository>();
            services.AddScoped<IBoardRepository, BoardRepository>();
            services.AddScoped<IDataRepository<WeatherForecast>, WeatherForecastRepository>();

            return services;
        }
    }
}
