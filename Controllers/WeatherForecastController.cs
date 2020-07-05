using NetCoreAngularNgrx.Common.Models;
using NetCoreAngularNgrx.Controllers.Common;
using NetCoreAngularNgrx.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace NetCoreAngularNgrx.Controllers
{
    [Route("api/[controller]")]
    public class WeatherForecastController : BaseController<WeatherForecast,int>
    {
        public WeatherForecastController(IDataRepository<WeatherForecast> dataRepository) : base(dataRepository)
        {
        }

   
    }
}
